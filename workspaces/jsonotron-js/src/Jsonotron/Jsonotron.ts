import Ajv from 'ajv'
import yaml from 'js-yaml'
import cloneDeep from 'clone-deep'
import { EnumType, TypeMap, JsonSchemaFormatValidatorFunc,
  SchemaType, Structure,
  StructureValidationResult, UnclassifiedType, ValueValidationResult } from '../interfaces'
import {
  dateTimeLocalFormatValidatorFunc,
  dateTimeUtcFormatValidatorFunc,
  luhnFormatValidatorFunc
} from '../jsonSchemaFormatValidators'
import {
  createJsonSchemaForEnumType, createJsonSchemaForEnumTypeArray,
  createJsonSchemaForSchemaType, createJsonSchemaForSchemaTypeArray
} from '../jsonSchemaGeneration'
import { InvalidEnumTypeError,
  InvalidSchemaTypeError,
  ParseYamlError,
  SchemaTypeExampleValidationError,
  SchemaTypeTestCaseInvalidationError,
  SchemaTypeTestCaseValidationError,
  UnrecognisedTypeKindError
} from '../errors'
import { enumTypeSchema, schemaTypeSchema } from '../schemas'
import { convertJsonotronTypesToTypeMap } from '../typeMap'

/**
 * Represents the properties that can be supplied to a Jsonotron constructur.
 */
interface JsonotronConstructorProps {
  /**
   * An array of enum and schema types as a YAML string.
   */
  types?: string[]

  /**
   * An object where each key is the name of a json schema format validator
   * and each corresponding value is the validator function. 
   */
  jsonSchemaFormatValidators?: Record<string, JsonSchemaFormatValidatorFunc>
}

/**
 * Providers methods for validating structures.
 */
export class Jsonotron {
  enumTypes: EnumType[] = []
  schemaTypes: SchemaType[] = []
  ajv: Ajv.Ajv
  enumTypeValidator?: Ajv.ValidateFunction
  schemaTypeValidator?: Ajv.ValidateFunction

  private ajvErrorsToString (errors?: Ajv.ErrorObject[]|null) {
    /* istanbul ignore next - errors will never be null/undefined */
    return JSON.stringify(errors || [], null, 2)
  }

  /**
   * Returns an object containing the parsed yaml contents.
   * @param contents The yaml contents.
   */
  private parseYaml (contents: string): UnclassifiedType {
    try {
      return yaml.safeLoad(contents, { }) as unknown as UnclassifiedType
    } catch (err) {
      throw new ParseYamlError(contents, err)
    }
  }

  /**
   * Add the given enum type to the Ajv.
   * @param enumType An enum type.
   */
  private addEnumTypeToAjv (enumType: EnumType): void {
    // check enum type conforms to the schema
    if (this.enumTypeValidator && !this.enumTypeValidator(enumType)) {
      throw new InvalidEnumTypeError(enumType.name, this.ajvErrorsToString(this.enumTypeValidator.errors))
    }

    // store the schema type
    this.enumTypes.push(enumType)

    // add singular and array enum type schemas
    this.ajv.addSchema(createJsonSchemaForEnumType(enumType))
    this.ajv.addSchema(createJsonSchemaForEnumTypeArray(enumType))
  }

  /**
   * Add the given schema type to the Ajv.
   * @param schemaType A schema type.
   */
  private addSchemaTypeToAjv (schemaType: SchemaType): void {
    // check schema type conforms to the schema
    if (this.schemaTypeValidator && !this.schemaTypeValidator(schemaType)) {
      throw new InvalidSchemaTypeError(schemaType.name, this.ajvErrorsToString(this.schemaTypeValidator.errors))
    }

    // store the schema type
    this.schemaTypes.push(schemaType)

    // add singular and array schema type schemas
    this.ajv.addSchema(createJsonSchemaForSchemaType(schemaType))
    this.ajv.addSchema(createJsonSchemaForSchemaTypeArray(schemaType))
  }

  /**
   * Validate the schema type examples, test cases and invalid test cases.
   */
  private validateSchemaTypeExamplesAndTestCases (): void {
    // validate the examples and test cases (now that all the types have been added)
    this.schemaTypes.forEach(s => {
      // get a validator
      const validator = this.ajv.getSchema(`${s.domain}/${s.system}/${s.name}`)

      // check the examples
      s.examples.forEach((ex, index) => {
        if (validator && !validator(ex.value)) {
          throw new SchemaTypeExampleValidationError(s.name, index, this.ajvErrorsToString(validator.errors))
        }
      })

      // check the valid test cases
      s.validTestCases.forEach((t, index) => {
        if (validator && !validator(t)) {
          throw new SchemaTypeTestCaseValidationError(s.name, index, this.ajvErrorsToString(validator.errors))
        }
      })

      // check the invalid test cases
      s.invalidTestCases.forEach((t, index) => {
        if (validator && validator(t)) {
          throw new SchemaTypeTestCaseInvalidationError(s.name, index)
        }
      })
    })
  }

  /**
   * Constructs a new instance of the Jsonotron class.
   * @param props A property bag that configures the new instance.
   */
  constructor (props?: JsonotronConstructorProps) {
    if (!props) { props = {} }
    if (!props.types) { props.types = [] }
    if (!props.jsonSchemaFormatValidators) { props.jsonSchemaFormatValidators = {} }

    // create a validator
    this.ajv = new Ajv({
      format: 'full', // 'full' mode supports format validators
      ownProperties: true, // only iterate over objects found directly on the object
      schemas: [
        enumTypeSchema,
        schemaTypeSchema
      ],
      formats: {
        'jsonotron-dateTimeLocal': dateTimeLocalFormatValidatorFunc,
        'jsonotron-dateTimeUtc': dateTimeUtcFormatValidatorFunc,
        'jsonotron-luhn': luhnFormatValidatorFunc,
        ...props.jsonSchemaFormatValidators
      }
    })

    // create the enum and schema validators for checking the types provided
    this.enumTypeValidator = this.ajv.getSchema('enumTypeSchema')
    this.schemaTypeValidator = this.ajv.getSchema('schemaTypeSchema')

    // check all types can be parsed
    const parsedTypes = props.types.map(t => this.parseYaml(t))

    // add the types to the ajv
    parsedTypes.forEach(t => {
      if (t.kind === 'enum') {
        // process enum type
        this.addEnumTypeToAjv(t as unknown as EnumType)
      } else if (t.kind === 'schema') {
        // process schema type
        this.addSchemaTypeToAjv(t as unknown as SchemaType)
      } else {
        throw new UnrecognisedTypeKindError(t.kind)
      }
    })

    // validate the schema type examples and test cases
    this.validateSchemaTypeExamplesAndTestCases()
  }

  /**
   * Returns an array of the enum types that are
   * part of any of the given systems.
   */
  getEnumTypes (systems?: string[]): EnumType[] {
    return this.enumTypes
      .filter(e => (systems || []).includes(`${e.domain}/${e.system}`))
      .map(e => cloneDeep<EnumType>(e))
  }

  /**
   * Returns an array of Schema types.
   */
  getSchemaTypes (systems?: string[]): SchemaType[] {
    return this.schemaTypes
      .filter(s => (systems ||[]).includes(`${s.domain}/${s.system}`))
      .map(s => cloneDeep<SchemaType>(s))
  }

  /**
   * Returns a type map of all the enum and schema types.
   */
  getTypeMap (systems?: string[]): TypeMap {
    return convertJsonotronTypesToTypeMap(
      this.enumTypes.filter(e => (systems || []).includes(`${e.domain}/${e.system}`)),
      this.schemaTypes.filter(s => (systems ||[]).includes(`${s.domain}/${s.system}`))
    )
  }

  /**
   * Validates the given value against the given enum or schema type.
   * @param fullyQualifiedTypeName The name of an enum or schema type.
   * @param value Any value.
   */
  validateValue (fullyQualifiedTypeName: string, value: unknown): ValueValidationResult {
    const validator = this.ajv.getSchema(fullyQualifiedTypeName)

    if (!validator) {
      return { resolved: false, validated: false, message: 'Unrecognised type.' }
    } else {
      if (validator(value)) {
        return { resolved: true, validated: true }
      } else {
        return { resolved: true, validated: false, message: this.ajvErrorsToString(validator.errors) }
      }
    }
  }

  /**
   * Validates the given array against the given enum or schema type.
   * @param fullyQualifiedTypeName The name of an enum or schema type.
   * @param value Any array value.
   */
  validateValueArray (fullyQualifiedTypeName: string, value: Array<unknown>): ValueValidationResult {
    return this.validateValue((fullyQualifiedTypeName) + '/array', value)
  }

  /**
   * Validates the given value object against the given structure.
   * @param structure An object where each key is the name of a field
   * and each value is a field definition.
   * @param value Any object.
   */
  validateStructure (structure: Structure, value: Record<string, unknown>): StructureValidationResult {
    const structureResult: StructureValidationResult = { fields: [], validated: true }

    const fieldNames = Object.keys(structure)

    fieldNames.forEach(fieldName => {
      const f = structure[fieldName]
      const v = value[fieldName]

      if (typeof v === 'undefined') {
        if (f.isRequired) {
          structureResult.fields.push({ name: fieldName, message: 'Field is required but was not supplied.' })
        }
      }
      else if (v === null) {
        if (!f.isNullable) {
          structureResult.fields.push({ name: fieldName, message: 'Field is not nullable.' })
        }
      } else {
        const fieldResult = f.isArray
        ? this.validateValueArray(f.type, v as unknown[] )
        : this.validateValue(f.type, v)

        if (!fieldResult.resolved) {
           /* istanbul ignore next - fieldResult.message will never be empty */
           structureResult.fields.push({ name: fieldName, message: fieldResult.message || 'Field type not recognised.' })
        } else if (!fieldResult.validated) {
           /* istanbul ignore next - fieldResult.message will never be empty */
          structureResult.fields.push({ name: fieldName, message: fieldResult.message || 'Unknown validation error.' })
        }
      }
    })

    structureResult.validated = structureResult.fields.length === 0

    return structureResult
  }
}
