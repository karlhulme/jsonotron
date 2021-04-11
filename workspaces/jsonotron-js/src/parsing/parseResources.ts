import Ajv, { ErrorObject, ValidateFunction } from 'ajv'
import addFormats from 'ajv-formats'
import yaml from 'js-yaml'
import {
  EnumType, JsonotronResource, JsonSchemaFormatValidatorFunc, SchemaType
} from 'jsonotron-interfaces'
import {
  dateTimeLocalFormatValidatorFunc,
  dateTimeUtcFormatValidatorFunc,
  luhnFormatValidatorFunc
} from '../jsonSchemaFormatValidators'
import {
  EnumTypeItemDataValidationError,
  InvalidEnumTypeDataSchemaError,
  InvalidEnumTypeError,
  InvalidSchemaTypeError,
  ParseYamlError,
  SchemaTypeExampleValidationError,
  SchemaTypeTestCaseInvalidationError,
  SchemaTypeTestCaseValidationError,
  UnrecognisedTypeKindError
} from '../errors'
import { enumTypeSchema, schemaTypeSchema } from '../schemas'
import { createJsonSchemaForEnumType, createJsonSchemaForSchemaType } from '../jsonSchemaGeneration'

/**
 * The options used when parsing a set of Jsonotron resources.
 */
interface ParseOptions {
  /**
   * An array of YAML or JSON strings.
   * Each string represents a Jsonotron enum or schema type.
   */
  resourceStrings?: string[]

  /**
   * An object where each key is the name of a json schema format validator
   * and each corresponding value is the validator function. 
   */
  jsonSchemaFormatValidators?: Record<string, JsonSchemaFormatValidatorFunc>
}

/**
 * The result of parsing a set of Jsonotron resources.
 */
interface ParseResult {
  /**
   * An array of verified enum types.
   */
  enumTypes: EnumType[]

  /**
   * An array of verified schema types.
   */
  schemaTypes: SchemaType[]
}

/**
 * Parses the given resource strings and returns a set of
 * validated enum and schema types.
 * @param options A set of options for the parsing process.
 */
export function parseResources (options?: ParseOptions): ParseResult {
  const domain ='https://jsonotron.org'
  const resourceStrings = options?.resourceStrings || []
  const jsonSchemaFormatValidators = options?.jsonSchemaFormatValidators || {}

  // convert strings to JsonotronResources with a 'kind' property.
  const resourceObjects = resourceStrings.map(t => convertYamlStringToObject(t))

  // sort the resources into enum and schema types.
  const parsedResources = sortResources(resourceObjects)

  // create an AJV with validators for enum and schema types.
  const ajv = createAjv(jsonSchemaFormatValidators)
  const enumTypeValidator = ajv.getSchema('enumTypeSchema') as ValidateFunction
  const schemaTypeValidator = ajv.getSchema('schemaTypeSchema') as ValidateFunction

  // verify the enum types.
  parsedResources.enumTypes.forEach(enumType => {
    ensureEnumTypeIsValid(enumTypeValidator, enumType)
    ensureEnumTypeItemDataPropertiesAreValid(ajv, enumType)
    ajv.addSchema(createJsonSchemaForEnumType(domain, enumType))
  })

  // verify the schema types.
  parsedResources.schemaTypes.forEach(schemaType => {
    ensureSchemaTypeIsValid(schemaTypeValidator, schemaType)
    ajv.addSchema(createJsonSchemaForSchemaType(domain, schemaType))
  })

  // verify the examples/test cases on all the schema types
  //  which may reference other schema types.
  parsedResources.schemaTypes.forEach(schemaType => {
    ensureSchemaTypeExamplesAndTestCasesAreValid(ajv, domain, schemaType)
  })

  return parsedResources
}

/**
 * Returns an AJV that contains validator functions for
 * enum and schema types.
 * @param jsonSchemaFormatValidators An optional record of custom validators.
 */
function createAjv (jsonSchemaFormatValidators?: Record<string, JsonSchemaFormatValidatorFunc>) {
  const ajv = new Ajv({
    ownProperties: true, // only iterate over objects found directly on the object
    schemas: [
      enumTypeSchema,
      schemaTypeSchema
    ],
    formats: {
      'jsonotron-dateTimeLocal': dateTimeLocalFormatValidatorFunc,
      'jsonotron-dateTimeUtc': dateTimeUtcFormatValidatorFunc,
      'jsonotron-luhn': luhnFormatValidatorFunc,
      ...jsonSchemaFormatValidators
    }
  })

  ajv.addKeyword('j-documentation') // ajv can safely ignore these

  addFormats(ajv, ['date', 'email', 'ipv4', 'ipv6', 'json-pointer', 'time'])

  return ajv
}

/**
 * Returns an object containing the parsed yaml contents.
 * @param contents The yaml contents.
 */
function convertYamlStringToObject (contents: string): JsonotronResource {
  try {
    return yaml.safeLoad(contents, { }) as JsonotronResource
  } catch (err) {
    throw new ParseYamlError(contents, err)
  }
}

/**
 * Sorts the given resources into their respective kinds.
 * @param resources An array of Jsonotron resources.
 */
function sortResources (resources: JsonotronResource[]): ParseResult {
  const result: ParseResult = {
    enumTypes: [],
    schemaTypes: []
  }

  resources.forEach(res => {
    switch(res.kind) {
      case 'enum': {
        result.enumTypes.push(res as EnumType)
        break
      }
      case 'schema': {
        result.schemaTypes.push(res as SchemaType)
        break
      }
      default: {
        throw new UnrecognisedTypeKindError(res.kind)
      }
    }
  })

  return result
}

/**
 * Validate the given enum type with the given validator function.
 * @param enumTypeValidator A valiator function created Ajv.
 * @param enumType An enum type.
 */
function ensureEnumTypeIsValid (enumTypeValidator: ValidateFunction, enumType: EnumType): void {
  // check enum type conforms to the schema
  const enumTypeName = enumType.name
  if (enumTypeValidator && !enumTypeValidator(enumType)) {
    throw new InvalidEnumTypeError(enumTypeName, ajvErrorsToString(enumTypeValidator.errors))
  }
}

/**
 * Validate the given schema type with the given validator function.
 * @param schemaTypeValidator A valiator function created Ajv.
 * @param schemaType A schema type.
 */
function ensureSchemaTypeIsValid (schemaTypeValidator: ValidateFunction, schemaType: SchemaType): void {
  // check schema type conforms to the schema
  const schemaTypeName = schemaType.name
  if (schemaTypeValidator && !schemaTypeValidator(schemaType)) {
    throw new InvalidSchemaTypeError(schemaTypeName, ajvErrorsToString(schemaTypeValidator.errors))
  }
}

/**
 * Validate the data properties of the enum type items.
 * @param ajv A json schema validator.
 */
function ensureEnumTypeItemDataPropertiesAreValid (ajv: Ajv, enumType: EnumType): void {
  // only check data if a schema is provided
  if (enumType.dataJsonSchema) {
    // create a validator
    const validator = compileEnumTypeDataSchema(ajv, enumType.name, enumType.dataJsonSchema)

    // check the items
    enumType.items.forEach(enumTypeItem => {
      if (!validator(enumTypeItem.data)) {
        throw new EnumTypeItemDataValidationError(enumType.name, enumTypeItem.value, ajvErrorsToString(validator.errors))
      }
    })
  }
}

/**
 * Compiles the given schema, raising an error if the schema cannot be compiled.
 * @param ajv A json schema validator.
 * @param enumTypeName The name of an enum type.
 * @param enumTypeDataJsonSchema A json schema.
 */
function compileEnumTypeDataSchema (ajv: Ajv, enumTypeName: string, enumTypeDataJsonSchema: Record<string, unknown>) {
  try {
    return ajv.compile(enumTypeDataJsonSchema)
  } catch (err) {
    throw new InvalidEnumTypeDataSchemaError(enumTypeName, err.message)
  }
}

/**
 * Validate the schema type examples, test cases and invalid test cases.
 * @param domain The domain for the $id of the schemas.
 */
function ensureSchemaTypeExamplesAndTestCasesAreValid (ajv: Ajv, domain: string, schemaType: SchemaType): void {
  // get a validator
  const validator = ajv.getSchema(`${domain}/${schemaType.system}/${schemaType.name}`)

  // check the examples
  schemaType.examples.forEach((ex, index) => {
    if (validator && !validator(ex.value)) {
      throw new SchemaTypeExampleValidationError(schemaType.name, index, ajvErrorsToString(validator.errors))
    }
  })

  // check the valid test cases
  schemaType.validTestCases.forEach((t, index) => {
    if (validator && !validator(t)) {
      throw new SchemaTypeTestCaseValidationError(schemaType.name, index, ajvErrorsToString(validator.errors))
    }
  })

  // check the invalid test cases
  schemaType.invalidTestCases.forEach((t, index) => {
    if (validator && validator(t)) {
      throw new SchemaTypeTestCaseInvalidationError(schemaType.name, index)
    }
  })
}

/**
 * Convert AJV errors to a string.
 * @param errors An array of error objects.
 */
function ajvErrorsToString (errors?: ErrorObject[]|null) {
  /* istanbul ignore next - errors will never be null/undefined */
  return JSON.stringify(errors || [], null, 2)
}
