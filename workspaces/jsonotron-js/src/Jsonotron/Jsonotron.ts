import Ajv from 'ajv'
import yaml from 'js-yaml'
import cloneDeep from 'clone-deep'
import { EnumType, TypeMap, GraphQLPrimitiveLookupProps, JsonSchemaFormatValidatorFunc,
  MarkdownGenerationProps, SchemaType, Structure,
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
import { createMarkdownForTypeSystem } from '../markdownGeneration'
import { InvalidEnumTypeError,
  InvalidSchemaTypeError,
  ParseYamlError,
  SchemaTypeExampleValidationError,
  SchemaTypeTestCaseInvalidationError,
  SchemaTypeTestCaseValidationError,
  UnrecognisedTypeKindError,
  UnrecognisedTypeNameError
} from '../errors'
import { enumTypeSchema, schemaTypeSchema } from '../schemas'
import { determineGraphQLPrimitiveForSchemaType, EnumTypeGraphQLDefinition } from '../graphQL'
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
   * Resolves the given type name into a fully qualified type name.
   * If a qualified name is supplied (i.e. one that includes a forward slash)
   * then the type is returned without further processsing.
   * If a qualified name cannot be found, then null is returned.
   * If multiple qualified names are found for a given short name, then null is returned.
   * @param type A short or fully qualified type.
   */
  private resolveTypeName (type: string): string|null {
    if (type.includes('/')) {
      return type // no processing
    } else {
      const possibleEnums = this.enumTypes.filter(e => e.name === type)
      const possibleSchemas = this.schemaTypes.filter(s => s.name === type)

      if (possibleEnums.length === 1 && possibleSchemas.length === 0) {
        return `${possibleEnums[0].domain}/${possibleEnums[0].system}/${possibleEnums[0].name}`
      } else if (possibleEnums.length === 0 && possibleSchemas.length === 1) {
        return `${possibleSchemas[0].domain}/${possibleSchemas[0].system}/${possibleSchemas[0].name}`
      } else if (possibleEnums.length === 0 && possibleSchemas.length === 0) {
        return null // no matches
      } else {
        return null // multiple matches
      } 
    }
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
   * Returns an array of Enum types.
   */
  getEnumTypes (): EnumType[] {
    return this.enumTypes.map(e => cloneDeep<EnumType>(e))
  }

  /**
   * Returns an array of Schema types.
   */
  getSchemaTypes (): SchemaType[] {
    return this.schemaTypes.map(e => cloneDeep<SchemaType>(e))
  }

  /**
   * Returns the fully qualified name of the given type.
   * This funcion will raise an exception if the given type
   * is in short form but cannot be resolved to a single type
   * either because it was not recognised or it matched the short
   * name in multiple type systems.
   * @param typeName The name of a type either in short or fully qualified form.
   */
  getFullyQualifiedTypeName (typeName: string): string {
    const resolvedTypeName = this.resolveTypeName(typeName)

    if (!resolvedTypeName) {
      throw new UnrecognisedTypeNameError(typeName)
    }

    return resolvedTypeName
  }

  /**
   * Returns a type map of all the enum and schema types.
   */
  getTypeMap (): TypeMap {
    return convertJsonotronTypesToTypeMap(this.enumTypes, this.schemaTypes)
  }

  /**
   * Returns a markdown document for the type system identified by
   * the given properties.
   * @param props The properties that describe the markdown to be generated.
   */
  getMarkdownForTypeSystem (props: MarkdownGenerationProps): string {
    return createMarkdownForTypeSystem(props, this.enumTypes, this.schemaTypes)
  } 

  /**
   * Returns the GraphQL primitive that can be used to store a value
   * of the given enum or schema type.
   * @param props The properties that describe the lookup to perform.
   */
  getGraphQLPrimitiveType (props: GraphQLPrimitiveLookupProps): string {
    const resolvedTypeName = this.resolveTypeName(props.typeName)

    const wrapArray = (s: string, add?: boolean) => add ? `[${s}!]` : s
    const wrapRequired = (s: string, add?: boolean) => add ? `${s}!` : s

    const matchedEnum = this.enumTypes.find(e => `${e.domain}/${e.system}/${e.name}` === resolvedTypeName)

    if (matchedEnum) {
      return wrapRequired(wrapArray('String', props.isArray), props.isRequired)
    }

    const matchedSchema = this.schemaTypes.find(s => `${s.domain}/${s.system}/${s.name}` === resolvedTypeName)

    if (matchedSchema) {
      const graphQLType = determineGraphQLPrimitiveForSchemaType(matchedSchema)
      return wrapRequired(wrapArray(graphQLType, props.isArray), props.isRequired)
    }

    throw new UnrecognisedTypeNameError(props.typeName)
  }

  /**
   * Returns the GraphQL definition for a Jsonotron enum type.
   */
  getGraphQLEnumType (): string {
    return EnumTypeGraphQLDefinition
  }

  /**
   * Validates the given value against the given enum or schema type.
   * @param type The name of an enum or schema type.
   * @param value Any value.
   */
  validateValue (typeName: string, value: unknown): ValueValidationResult {
    const resolvedTypeName = this.resolveTypeName(typeName)

    if (!resolvedTypeName) {
      return { resolved: false, validated: false, message: 'Ambiguous or unrecognised type, use fully qualified name.' }
    } else {
      const validator = this.ajv.getSchema(resolvedTypeName)

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
  }

  /**
   * Validates the given array against the given enum or schema type.
   * @param typeName The name of an enum or schema type.
   * @param value Any array value.
   */
  validateValueArray (typeName: string, value: Array<unknown>): ValueValidationResult {
    return this.validateValue((this.resolveTypeName(typeName)) + '/array', value)
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
