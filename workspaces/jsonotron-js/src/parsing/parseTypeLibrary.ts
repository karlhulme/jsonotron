import Ajv, { ErrorObject, ValidateFunction } from 'ajv'
import yaml from 'js-yaml'
import {
  EnumType, FloatType, IntType, JsonotronType,
  RecordType, StringType, TypeLibrary
} from 'jsonotron-interfaces'
import {
  DuplicateTypeNameError,
  EnumTypeItemDataValidationError,
  InvalidTypeError,
  ParseYamlError,
  TestCaseInvalidationError,
  TestCaseValidationError,
  RecordTypeVariantUnrecognisedPropertyError,
  UnrecognisedTypeError,
  UnrecognisedTypeKindError
} from '../errors'
import {
  boolTypeSchema, enumTypeSchema,
  floatTypeSchema, intTypeSchema,
  recordTypeSchema, stringTypeSchema
} from '../schemas'
import { ParseOptions } from './ParseOptions'
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

  // Convert strings to JsonotronTypes with a 'kind' property.
  const resourceObjects = resourceStrings.map(t => convertYamlStringToObject(t))

  // Create a set of validators for the various types.
  const typeValidators = createTypeValidators()

  // Validate and sort the resources into specific types.
  const typeLibrary = sortResources(resourceObjects, typeValidators)

  // Get all the type names that have been loaded.
  const systemQualifiedTypeNames = extractSystemQualifiedTypeNames(typeLibrary)
  ensureSystemQualifiedTypeNamesAreUnique(systemQualifiedTypeNames)

  // Verify the data types of enums.
  typeLibrary.enumTypes.forEach(enumScalarType => {
    ensureEnumTypeDataTypeIsValid(enumScalarType, systemQualifiedTypeNames)
  })

  // Verify the property types of records.
  typeLibrary.recordTypes.forEach(recordType => {
    ensureRecordTypePropertiesPropertyTypeAreValid(recordType, systemQualifiedTypeNames)
  })

  // Create a JSON schema validator that we can use to validate
  // the example, test case and enum data values that are expressed
  // directly in the type definitions using JSON.
  const jsonSchemaValidator = createJsonSchemaValidator(INTERNAL_DOMAIN, typeLibrary)

  // Verify the enum item data items.
  typeLibrary.enumTypes.forEach(enumScalarType => {
    ensureEnumTypeItemsDataIsValid(jsonSchemaValidator, enumScalarType)
  })

  // Verify the test cases on all the string types
  typeLibrary.stringTypes.forEach(stringType => {
    ensureStringTypeTestCasesAreValid(jsonSchemaValidator, stringType)
  })

  // Verify the test cases on all the record types
  typeLibrary.recordTypes.forEach(recordType => {
    ensureRecordTypeTestCasesAreValid(jsonSchemaValidator, recordType)
  })

  // Verify the fields on the variants are valid.
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
 * Returns the given typeName with the system name prepended if one
 * is not already included.
 * @param system A system name.
 * @param typeName A type name that may or may not be system qualified.
 */
function getSystemQualifiedTypeName (system: string, typeName: string) {
  return typeName.includes('/')
    ? typeName
    : `${system}/${typeName}`
}

/**
 * Returns the system part of the given system qualified type.
 * @param systemQualifiedType A system qualified type in the form sys/name.
 */
function getSystemPartOfSystemQualifiedType (systemQualifiedType: string) {
  return systemQualifiedType.substring(0, systemQualifiedType.indexOf('/'))
}

/**
 * Returns the name part of the given system qualified type.
 * @param systemQualifiedType A system qualified type in the form sys/name.
 */
function getNamePartOfSystemQualifiedType (systemQualifiedType: string) {
  return systemQualifiedType.substring(systemQualifiedType.indexOf('/') + 1)
}

/**
 * Returns a set of validators for the various types.
 */
function createTypeValidators (): TypeValidators {
  const ajv = new Ajv({ ownProperties: true })

  return {
    boolTypeValidator: ajv.compile(boolTypeSchema),
    enumTypeValidator: ajv.compile(enumTypeSchema),
    floatTypeValidator: ajv.compile(floatTypeSchema),
    intTypeValidator: ajv.compile(intTypeSchema),
    objectTypeValidator: ajv.compile(objectTypeSchema),
    recordTypeValidator: ajv.compile(recordTypeSchema),
    stringTypeValidator: ajv.compile(stringTypeSchema)
  }
}

/**
 * Sorts the given resources into their respective kinds.
 * @param resources An array of Jsonotron resources.
 * @param validators A set of type validators.
 */
function sortResources (resources: JsonotronType[], validators: TypeValidators): TypeLibrary {
  const result: TypeLibrary = {
    boolTypes: [],
    enumTypes: [],
    floatTypes: [],
    intTypes: [],
    objectTypes: [],
    recordTypes: [],
    stringTypes: []
  }

  resources.forEach(res => {
    switch(res.kind) {
      case 'bool': {
        ensureTypeIsValid(res, validators.boolTypeValidator)
        result.boolTypes.push(res)
        break
      }
      case 'enum': {
        ensureTypeIsValid(res, validators.enumTypeValidator)
        result.enumTypes.push(res as EnumType)
        break
      }
      case 'float': {
        ensureTypeIsValid(res, validators.floatTypeValidator)
        result.floatTypes.push(res as FloatType)
        break
      }
      case 'int': {
        ensureTypeIsValid(res, validators.intTypeValidator)
        result.intTypes.push(res as IntType)
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
      case 'string': {
        ensureTypeIsValid(res, validators.stringTypeValidator)
        result.stringTypes.push(res as StringType)
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

  result.push(...typeLibrary.boolTypes.map(type => `${type.system}/${type.name}`))
  result.push(...typeLibrary.enumTypes.map(type => `${type.system}/${type.name}`))
  result.push(...typeLibrary.floatTypes.map(type => `${type.system}/${type.name}`))
  result.push(...typeLibrary.intTypes.map(type => `${type.system}/${type.name}`))
  result.push(...typeLibrary.objectTypes.map(type => `${type.system}/${type.name}`))
  result.push(...typeLibrary.recordTypes.map(type => `${type.system}/${type.name}`))
  result.push(...typeLibrary.stringTypes.map(type => `${type.system}/${type.name}`))

  return result
}

/**
 * Raises an error if the qualified type names are not unique.
 * @param systemQualifiedTypeNames An array of system-qualified type names.
 */
function ensureSystemQualifiedTypeNamesAreUnique (systemQualifiedTypeNames: string[]): void {
  const pool: string[] = []

  systemQualifiedTypeNames.forEach(systemQualifiedTypeName => {
    if (pool.includes(systemQualifiedTypeName)) {
      throw new DuplicateTypeNameError(systemQualifiedTypeName)
    } else {
      pool.push(systemQualifiedTypeName)
    }
  })
}

/**
 * Raises an error if the given enum scalar type describes data of an unrecognised type.
 * @param enumScalarType An enum scalar type.
 * @param systemQualifiedTypeNames An array of system qualified type names.
 */
function ensureEnumTypeDataTypeIsValid (enumScalarType: EnumType, systemQualifiedTypeNames: string[]): void {
  if (enumScalarType.dataType && !systemQualifiedTypeNames.includes(getSystemQualifiedTypeName(enumScalarType.system, enumScalarType.dataType))) {
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
    const qualifiedPropertyType = getSystemQualifiedTypeName(recordType.system, property.propertyType)

    if (!systemQualifiedTypeNames.includes(qualifiedPropertyType)) {
      throw new UnrecognisedTypeError(property.propertyType)
    }

    property.propertyType = qualifiedPropertyType
    property.propertyTypeSystem = getSystemPartOfSystemQualifiedType(qualifiedPropertyType)
    property.propertyTypeName = getNamePartOfSystemQualifiedType(qualifiedPropertyType)
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
function ensureEnumTypeItemsDataIsValid (jsonSchemaValidator: Ajv, enumScalarType: EnumType): void {
  // Only check data if a schema is provided.
  if (enumScalarType.dataType) {
    // Get the validator.
    const qualifiedDataType = getDomainQualifiedTypeReference(INTERNAL_DOMAIN, enumScalarType.system, enumScalarType.dataType)
    const validator = jsonSchemaValidator.getSchema(qualifiedDataType) as ValidateFunction

    // Check the data attached to each item.
    enumScalarType.items.forEach(item => {
      if (!validator(item.data)) {
        throw new EnumTypeItemDataValidationError(enumScalarType.name, item.value, ajvErrorsToString(validator.errors))
      }
    })
  }
}

/**
 * Validate the record type test cases and invalid test cases.
 * @param jsonSchemaValidator A json schema validator.
 * @param recordType A record type.
 */
function ensureRecordTypeTestCasesAreValid(jsonSchemaValidator: Ajv, recordType: RecordType): void {
  // Get a validator (assume it will be found because they are generated automatically).
  const validator = jsonSchemaValidator.getSchema(`${INTERNAL_DOMAIN}/${recordType.system}/${recordType.name}`) as ValidateFunction

  // Check the valid test cases.
  recordType.validTestCases.forEach((t, index) => {
    if (validator && !validator(t.value)) {
      throw new TestCaseValidationError(recordType.name, index, ajvErrorsToString(validator.errors))
    }
  })

  // Check the invalid test cases.
  recordType.invalidTestCases?.forEach((t, index) => {
    if (validator && validator(t.value)) {
      throw new TestCaseInvalidationError(recordType.name, index)
    }
  })
}

/**
 * Validate the string type test cases and invalid test cases.
 * @param jsonSchemaValidator A json schema validator.
 * @param recordType A record type.
 */
 function ensureStringTypeTestCasesAreValid(jsonSchemaValidator: Ajv, stringType: StringType): void {
  // Get a validator (assume it will be found because they are generated automatically).
  const validator = jsonSchemaValidator.getSchema(`${INTERNAL_DOMAIN}/${stringType.system}/${stringType.name}`) as ValidateFunction

  // Check the valid test cases.
  stringType.validTestCases?.forEach((t, index) => {
    if (validator && !validator(t.value)) {
      throw new TestCaseValidationError(stringType.name, index, ajvErrorsToString(validator.errors))
    }
  })

  // Check the invalid test cases.
  stringType.invalidTestCases?.forEach((t, index) => {
    if (validator && validator(t.value)) {
      throw new TestCaseInvalidationError(stringType.name, index)
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
