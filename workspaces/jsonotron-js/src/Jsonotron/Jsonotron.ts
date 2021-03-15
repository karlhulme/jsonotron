import Ajv from 'ajv'
import yaml from 'js-yaml'
import cloneDeep from 'clone-deep'
import {
  EnumType, Field,
  JsonotronBaseType, JsonotronResource, JsonSchemaFormatValidatorFunc,
  SchemaType, Structure, StructureValidationResult,
  ValueValidationResult
} from 'jsonotron-interfaces'
import {
  dateTimeLocalFormatValidatorFunc,
  dateTimeUtcFormatValidatorFunc,
  luhnFormatValidatorFunc
} from '../jsonSchemaFormatValidators'
import {
  createJsonSchemaForEnumType, createJsonSchemaForEnumTypeArray,
  createJsonSchemaForSchemaType, createJsonSchemaForSchemaTypeArray
} from '../jsonSchemaGeneration'
import {
  EnumTypeItemDataValidationError,
  InvalidEnumTypeDataSchemaError,
  InvalidEnumTypeError,
  InvalidSchemaTypeError,
  InvalidStructureError,
  ParseYamlError,
  SchemaTypeExampleValidationError,
  SchemaTypeTestCaseInvalidationError,
  SchemaTypeTestCaseValidationError,
  StructureFieldsValidationError,
  StructureNotFoundError,
  StructureValidationError,
  UnrecognisedTypeKindError
} from '../errors'
import { enumTypeSchema, schemaTypeSchema, structureSchema } from '../schemas'

/**
 * Represents the properties that can be supplied to a Jsonotron constructur.
 */
interface JsonotronConstructorProps {
  /**
   * An array of resources as an array of YAML strings.
   * A resource is an enum type, schema type or structure.
   */
  resources?: string[]

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
  structures: Structure[] = []
  ajv: Ajv.Ajv
  enumTypeValidator?: Ajv.ValidateFunction
  schemaTypeValidator?: Ajv.ValidateFunction
  structureValidator?: Ajv.ValidateFunction

  /**
   * Constructs a new instance of the Jsonotron class.
   * @param props A property bag that configures the new instance.
   */
   constructor (props?: JsonotronConstructorProps) {
    if (!props) { props = {} }
    if (!props.resources) { props.resources = [] }
    if (!props.jsonSchemaFormatValidators) { props.jsonSchemaFormatValidators = {} }

    // create a validator
    this.ajv = new Ajv({
      format: 'full', // 'full' mode supports format validators
      ownProperties: true, // only iterate over objects found directly on the object
      schemas: [
        enumTypeSchema,
        schemaTypeSchema,
        structureSchema
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
    this.structureValidator = this.ajv.getSchema('structureSchema')

    // check all types and structures can be parsed
    const parsedResources = props.resources.map(t => this.parseYaml(t))

    // add the types to the ajv
    parsedResources.forEach(t => {
      if (t.kind === 'enum') {
        // process enum type
        this.addEnumTypeToAjv(t as unknown as EnumType)
      } else if (t.kind === 'schema') {
        // process schema type
        this.addSchemaTypeToAjv(t as unknown as SchemaType)
      } else if (t.kind === 'structure') {
        // process structure
        this.addStructureToAjv(t as unknown as Structure)
      } else {
        throw new UnrecognisedTypeKindError(t.kind)
      }
    })

    // validate the data properties of enum type items
    this.validateEnumTypeItemDataProperties()

    // validate the schema type examples and test cases
    this.validateSchemaTypeExamplesAndTestCases()

    // validate the field types used in the structures
    this.validateStructureFields()
  }

  /**
   * Returns an object containing the parsed yaml contents.
   * @param contents The yaml contents.
   */
  private parseYaml (contents: string): JsonotronResource {
    try {
      return yaml.safeLoad(contents, { }) as unknown as JsonotronResource
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
   * Add the given structure to the Ajv.
   * @param structure A structure.
   */
  private addStructureToAjv (structure: Structure): void {
    // check schema type conforms to the schema
    if (this.structureValidator && !this.structureValidator(structure)) {
      throw new InvalidStructureError(structure.name, this.ajvErrorsToString(this.structureValidator.errors))
    }

    // store the structure
    this.structures.push(structure)
  }

  /**
   * Convert AJV errors to a string.
   * @param errors An array of error objects.
   */
  private ajvErrorsToString (errors?: Ajv.ErrorObject[]|null) {
    /* istanbul ignore next - errors will never be null/undefined */
    return JSON.stringify(errors || [], null, 2)
  }

  /**
   * Validate the data properties of the enum type items.
   */
  private validateEnumTypeItemDataProperties (): void {
    this.enumTypes.forEach(enumType => {
      // only check data if a schema is provided
      if (enumType.dataJsonSchema) {
        // create a validator
        const validator = this.compileEnumTypeDataSchema(enumType.name, enumType.dataJsonSchema)

        // check the items
        enumType.items.forEach(enumTypeItem => {
          if (!validator(enumTypeItem.data)) {
            throw new EnumTypeItemDataValidationError(enumType.name, enumTypeItem.value, this.ajvErrorsToString(validator.errors))
          }
        })
      }
    })
  }

  /**
   * Compiles the given schema, raising an error if the schema cannot be compiled.
   * @param enumTypeName The name of an enum type.
   * @param enumTypeDataJsonSchema A json schema.
   */
  private compileEnumTypeDataSchema (enumTypeName: string, enumTypeDataJsonSchema: Record<string, unknown>) {
    try {
      return this.ajv.compile(enumTypeDataJsonSchema)
    } catch (err) {
      throw new InvalidEnumTypeDataSchemaError(enumTypeName, err.message)
    }
  }

  /**
   * Validate the schema type examples, test cases and invalid test cases.
   */
  private validateSchemaTypeExamplesAndTestCases (): void {
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
   * Validate the fields of the structures.
   */
  private validateStructureFields (): void {
    this.structures.forEach(structure => {
      Object.keys(structure.fields).forEach(fieldName => {
        const field = structure.fields[fieldName]
        const matchedEnumType = this.enumTypes.findIndex(e => `${e.domain}/${e.system}/${e.name}` === field.type)
        const matchedSchemaType = this.schemaTypes.findIndex(s => `${s.domain}/${s.system}/${s.name}` === field.type)

        if (matchedEnumType === -1 && matchedSchemaType === -1) {
          throw new StructureFieldsValidationError(structure.name, fieldName, field.type)
        }
      })
    })
  }

  /*
   *
   * Public interface
   * 
   */

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
   * Returns the enum or schema type with the given fully qualified name.
   * If the type cannot be found, this function returns null.
   * @param fullyQualifiedName The fully qualified name of a type.
   */
  getType (fullyQualifiedName: string): JsonotronBaseType|null {
    for (const enumType of this.enumTypes) {
      if (`${enumType.domain}/${enumType.system}/${enumType.name}` === fullyQualifiedName) {
        return cloneDeep<EnumType>(enumType)
      }
    }

    for (const schemaType of this.schemaTypes) {
      if (`${schemaType.domain}/${schemaType.system}/${schemaType.name}` === fullyQualifiedName) {
        return cloneDeep<SchemaType>(schemaType)
      }
    }

    return null
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
   * Validates the given value object against the given field set.
   * @param fields An object where each key is the name of a field
   * and each value is a field definition.
   * @param obj An object to validate.
   */
  validateStructure (fields: Record<string, Field>, obj: Record<string, unknown>): StructureValidationResult {
    const structureResult: StructureValidationResult = { fields: [], validated: true }

    const fieldNames = Object.keys(fields)

    fieldNames.forEach(fieldName => {
      const f = fields[fieldName]
      const v = obj[fieldName]

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

  /**
   * Validate the given object against the named structure.
   * @param structureName The name of a structure.
   * @param obj An object to validate.
   */
  ensureStructure<T> (structureName: string, obj: Record<string, unknown>): T {
    const structure = this.structures.find(s => s.name === structureName)

    if (!structure) {
      throw new StructureNotFoundError(structureName)
    }

    const validationResult = this.validateStructure(structure.fields, obj)
    
    if (!validationResult.validated) {
      throw new StructureValidationError(structure.name, validationResult)
    }

    return obj as T
  }
}
