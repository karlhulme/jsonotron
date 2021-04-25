import Ajv, { ErrorObject, ValidateFunction } from 'ajv'
import yaml from 'js-yaml'
import {
  ArrayType, EnumScalarType, FloatScalarType,
  IntScalarType, JsonotronType, RecordType,
  StringScalarType
} from 'jsonotron-interfaces'
import {
  EnumScalarTypeItemDataValidationError,
  InvalidTypeError,
  ParseYamlError,
  RecordTypeTestCaseInvalidationError,
  RecordTypeTestCaseValidationError,
  RecordTypeVariantUnrecognisedPropertyError,
  UnrecognisedTypeError,
  UnrecognisedTypeKindError
} from '../errors'
import {
  arrayTypeSchema, boolScalarTypeSchema, enumScalarTypeSchema,
  floatScalarTypeSchema, intScalarTypeSchema,
  recordTypeSchema, stringScalarTypeSchema
} from '../schemas'
import { ParseOptions } from './ParseOptions'
import { TypeLibrary } from './TypeLibrary'
import { TypeValidators } from './TypeValidators'
import { objectTypeSchema } from '../schemas/objectTypeSchema'
import { createJsonSchemaValidator } from './createJsonSchemaValidator'
import { getDomainQualifiedTypeReference } from '../jsonSchemaGeneration'

/**
 * The domain used for the JSON schemas that are generated for
 * the purpose of verifying the types.
 */
const INTERNAL_DOMAIN = 'https://jsonotron.org'

/**
 * Parses the given resource strings and returns a set of validated types.
 * @param options A set of options for the parsing process.
 */
export function parseTypeLibrary (options?: ParseOptions): TypeLibrary {
  const resourceStrings = options?.resourceStrings || []

  // convert strings to JsonotronTypes with a 'kind' property.
  const resourceObjects = resourceStrings.map(t => convertYamlStringToObject(t))

  // create a set of validators for the various types.
  const typeValidators = createTypeValidators()

  // validate and sort the resources into specific types.
  const typeLibrary = sortResources(resourceObjects, typeValidators)

  // get all the type names that have been loaded.
  const systemQualifiedTypeNames = extractSystemQualifiedTypeNames(typeLibrary)

  // verify the element types of arrays.
  typeLibrary.arrayTypes.forEach(arrayType => {
    ensureArrayTypeElementTypeIsValid(arrayType, systemQualifiedTypeNames)
  })

  // verify the data types of enums.
  typeLibrary.enumScalarTypes.forEach(enumScalarType => {
    ensureEnumScalarTypeDataTypeIsValid(enumScalarType, systemQualifiedTypeNames)
  })

  // verify the property types of records.
  typeLibrary.recordTypes.forEach(recordType => {
    ensureRecordTypePropertiesPropertyTypeAreValid(recordType, systemQualifiedTypeNames)
  })

  // create a JSON schema validator that we can use to validate
  // the example, test case and enum data values that are expressed
  // directly in the type definitions using JSON.
  const jsonSchemaValidator = createJsonSchemaValidator(INTERNAL_DOMAIN, typeLibrary)

  // verify the enum item data items.
  typeLibrary.enumScalarTypes.forEach(enumScalarType => {
    ensureEnumScalarTypeItemsDataIsValid(jsonSchemaValidator, enumScalarType)
  })

  // verify the examples/test cases on all the schema types
  //  which may reference other schema types.
  typeLibrary.recordTypes.forEach(recordType => {
    ensureRecordTypeExamplesAndTestCasesAreValid(jsonSchemaValidator, recordType)
  })

  // verify the fields on the variants are valid.
  typeLibrary.recordTypes.forEach(recordType => {
    ensureRecordTypeVariantsAreValid(recordType)
  })

  return typeLibrary
}

/**
 * Returns an object containing the parsed yaml contents.
 * @param contents The yaml contents.
 */
function convertYamlStringToObject (contents: string): JsonotronType {
  try {
    return yaml.safeLoad(contents) as JsonotronType
  } catch (err) {
    throw new ParseYamlError(contents, err)
  }
}

/**
 * Returns a set of validators for the various types.
 */
function createTypeValidators (): TypeValidators {
  const ajv = new Ajv({ ownProperties: true })

  return {
    arrayTypeValidator: ajv.compile(arrayTypeSchema),
    boolScalarTypeValidator: ajv.compile(boolScalarTypeSchema),
    enumScalarTypeValidator: ajv.compile(enumScalarTypeSchema),
    floatScalarTypeValidator: ajv.compile(floatScalarTypeSchema),
    intScalarTypeValidator: ajv.compile(intScalarTypeSchema),
    objectTypeValidator: ajv.compile(objectTypeSchema),
    recordTypeValidator: ajv.compile(recordTypeSchema),
    stringScalarTypeValidator: ajv.compile(stringScalarTypeSchema)
  }
}

/**
 * Sorts the given resources into their respective kinds.
 * @param resources An array of Jsonotron resources.
 * @param validators A set of type validators.
 */
function sortResources (resources: JsonotronType[], validators: TypeValidators): TypeLibrary {
  const result: TypeLibrary = {
    arrayTypes: [],
    boolScalarTypes: [],
    enumScalarTypes: [],
    floatScalarTypes: [],
    intScalarTypes: [],
    objectTypes: [],
    recordTypes: [],
    stringScalarTypes: []
  }

  resources.forEach(res => {
    switch(res.kind) {
      case 'array': {
        ensureTypeIsValid(res, validators.arrayTypeValidator)
        result.arrayTypes.push(res as ArrayType)
        break
      }
      case 'boolScalar': {
        ensureTypeIsValid(res, validators.boolScalarTypeValidator)
        result.boolScalarTypes.push(res)
        break
      }
      case 'enumScalar': {
        ensureTypeIsValid(res, validators.enumScalarTypeValidator)
        result.enumScalarTypes.push(res as EnumScalarType)
        break
      }
      case 'floatScalar': {
        ensureTypeIsValid(res, validators.floatScalarTypeValidator)
        result.floatScalarTypes.push(res as FloatScalarType)
        break
      }
      case 'intScalar': {
        ensureTypeIsValid(res, validators.intScalarTypeValidator)
        result.intScalarTypes.push(res as IntScalarType)
        break
      }
      case 'object': {
        ensureTypeIsValid(res, validators.objectTypeValidator)
        result.objectTypes.push(res)
        break
      }
      case 'record': {
        ensureTypeIsValid(res, validators.recordTypeValidator)
        result.recordTypes.push(res as RecordType)
        break
      }
      case 'stringScalar': {
        ensureTypeIsValid(res, validators.stringScalarTypeValidator)
        result.stringScalarTypes.push(res as StringScalarType)
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
 * Returns an array of system qualified type names.
 * @param typeLibrary A type library.
 */
function extractSystemQualifiedTypeNames (typeLibrary: TypeLibrary): string[] {
  const result: string[] = []

  result.push(...typeLibrary.arrayTypes.map(type => `${type.system}/${type.name}`))
  result.push(...typeLibrary.boolScalarTypes.map(type => `${type.system}/${type.name}`))
  result.push(...typeLibrary.enumScalarTypes.map(type => `${type.system}/${type.name}`))
  result.push(...typeLibrary.floatScalarTypes.map(type => `${type.system}/${type.name}`))
  result.push(...typeLibrary.intScalarTypes.map(type => `${type.system}/${type.name}`))
  result.push(...typeLibrary.objectTypes.map(type => `${type.system}/${type.name}`))
  result.push(...typeLibrary.recordTypes.map(type => `${type.system}/${type.name}`))
  result.push(...typeLibrary.stringScalarTypes.map(type => `${type.system}/${type.name}`))

  return result
}

/**
 * Raises an error if the given array type describes elements of an unrecognised type.
 * @param arrayType An array type.
 * @param systemQualifiedTypeNames An array of system qualified type names.
 */
function ensureArrayTypeElementTypeIsValid (arrayType: ArrayType, systemQualifiedTypeNames: string[]): void {
  if (!systemQualifiedTypeNames.includes(arrayType.elementType)) {
    throw new UnrecognisedTypeError(arrayType.elementType)
  }
}

/**
 * Raises an error if the given enum scalar type describes data of an unrecognised type.
 * @param enumScalarType An enum scalar type.
 * @param systemQualifiedTypeNames An array of system qualified type names.
 */
function ensureEnumScalarTypeDataTypeIsValid (enumScalarType: EnumScalarType, systemQualifiedTypeNames: string[]): void {
  if (enumScalarType.dataType && !systemQualifiedTypeNames.includes(enumScalarType.dataType)) {
    throw new UnrecognisedTypeError(enumScalarType.dataType)
  }
}

/**
 * Raises an error if the given record type describe a property of an unrecognised type.
 * @param recordType A record type.
 * @param systemQualifiedTypeNames An array of system qualified type names.
 */
function ensureRecordTypePropertiesPropertyTypeAreValid (recordType: RecordType, systemQualifiedTypeNames: string[]): void {
  recordType.properties.forEach(property => {
    if (!systemQualifiedTypeNames.includes(property.propertyType)) {
      throw new UnrecognisedTypeError(property.propertyType)
    }
  })
}

/**
 * Raises an InvalidTypeError if the given type is not valid according
 * to the given validator.
 * @param type The type to validate.
 * @param validator An AJV validator function.
 */
function ensureTypeIsValid (type: JsonotronType, validator: ValidateFunction) {
  const isValid = validator(type)

  if (!isValid) {
    throw new InvalidTypeError(type.name, type.kind, ajvErrorsToString(validator.errors))
  }
}

/**
 * Convert validator errors to a string.
 * @param errors An array of error objects.
 */
function ajvErrorsToString (errors?: ErrorObject[]|null) {
  /* istanbul ignore next - errors will never be null/undefined */
  return JSON.stringify(errors || [], null, 2)
}

/**
 * Validate the data properties of the enum type items.
 * @param jsonSchemaValidator A json schema validator.
 * @param enumScalarType An enum scalar type.
 */
function ensureEnumScalarTypeItemsDataIsValid (jsonSchemaValidator: Ajv, enumScalarType: EnumScalarType): void {
  // only check data if a schema is provided
  if (enumScalarType.dataType) {
    // get the validator
    const qualifiedDataType = getDomainQualifiedTypeReference(INTERNAL_DOMAIN, enumScalarType.system, enumScalarType.dataType)
    const validator = jsonSchemaValidator.getSchema(qualifiedDataType) as ValidateFunction

    // check the data attached to each item
    enumScalarType.items.forEach(item => {
      if (!validator(item.data)) {
        throw new EnumScalarTypeItemDataValidationError(enumScalarType.name, item.value, ajvErrorsToString(validator.errors))
      }
    })
  }
}

/**
 * Validate the record type examples, test cases and invalid test cases.
 * @param jsonSchemaValidator A json schema validator.
 * @param recordType A record type.
 */
function ensureRecordTypeExamplesAndTestCasesAreValid(jsonSchemaValidator: Ajv, recordType: RecordType): void {
  // get a validator (assume it will be found because they are generated automatically)
  const validator = jsonSchemaValidator.getSchema(`${INTERNAL_DOMAIN}/${recordType.system}/${recordType.name}`) as ValidateFunction

  // check the valid test cases
  recordType.validTestCases.forEach((t, index) => {
    if (validator && !validator(t.value)) {
      throw new RecordTypeTestCaseValidationError(recordType.name, index, ajvErrorsToString(validator.errors))
    }
  })

  // check the invalid test cases
  recordType.invalidTestCases?.forEach((t, index) => {
    if (validator && validator(t)) {
      throw new RecordTypeTestCaseInvalidationError(recordType.name, index)
    }
  })
}

/**
 * Validate the schema type variants.
 * @param recordType A record type.
 */
function ensureRecordTypeVariantsAreValid (recordType: RecordType): void {
  recordType.variants?.forEach(variant => {
    if (Array.isArray(variant.includeProperties)) {
      variant.includeProperties.forEach(propertyName => {
        if (recordType.properties.findIndex(property => property.name === propertyName) === -1) {
          throw new RecordTypeVariantUnrecognisedPropertyError(recordType.name, variant.name, propertyName)
        }
      })
    }

    if (Array.isArray(variant.excludeProperties)) {
      variant.excludeProperties.forEach(propertyName => {
        if (recordType.properties.findIndex(property => property.name === propertyName) === -1) {
          throw new RecordTypeVariantUnrecognisedPropertyError(recordType.name, variant.name, propertyName)
        }
      })
    }
  })
}
