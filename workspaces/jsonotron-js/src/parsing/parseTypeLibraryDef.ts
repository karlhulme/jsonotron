import Ajv, { ErrorObject, ValidateFunction } from 'ajv'
import yaml from 'js-yaml'
import {
  EnumTypeDef, FloatTypeDef, IntTypeDef, JsonotronTypeDef,
  RecordFactory,
  RecordTypeDef, StringTypeDef, TypeLibraryDef
} from 'jsonotron-interfaces'
import {
  DuplicateTypeNameError,
  EnumTypeItemDataValidationError,
  InvalidTypeError,
  ParseYamlError,
  TestCaseInvalidationError,
  TestCaseValidationError,
  UnrecognisedDataTypeOnEnumTypeError,
  UnrecognisedTypeKindError,
  UnrecognisedPropertyNameOnRecordTypeError,
  DuplicatePropertyNameOnRecordTypeError,
  UnrecognisedPropertyTypeOnRecordTypeError,
  UnrecognisedFactoryNameError
} from '../errors'
import { createTypeDefValidators, TypeDefValidators } from '../typeDefSchemas'
import { createAjvFromTypeLibraryDef, getDomainQualifiedTypeReference } from '../typeDefValueSchemas'

/**
 * The domain used for the JSON schemas that are generated for
 * the purpose of verifying the types.
 */
const INTERNAL_DOMAIN = 'https://jsonotron.org'

/**
 * Parses the given resource strings and returns a set of validated types.
 * @param resourceStrings An array of YAML or JSON strings.
 */
export function parseTypeLibraryDef (resourceStrings: string[], factories: RecordFactory[]): TypeLibraryDef {
  // Convert strings to JsonotronTypes with a 'kind' property.
  const resourceObjects = resourceStrings.map(t => convertYamlStringToObject(t))

  // Create a set of validators for the various types.
  const typeValidators = createTypeDefValidators()

  // Validate and sort the resources into specific types.
  const typeLibraryDef = sortResources(resourceObjects, typeValidators)

  // Execute factories to expand record types.
  executeRecordFactories(typeLibraryDef, factories)

  // Get all the type names that have been loaded.
  const systemQualifiedTypeNames = extractSystemQualifiedTypeNames(typeLibraryDef)
  ensureSystemQualifiedTypeNamesAreUnique(systemQualifiedTypeNames)

  // Verify the data types of enums.
  typeLibraryDef.enumTypeDefs.forEach(enumTypeDef => {
    ensureEnumTypeDataTypeIsValid(enumTypeDef, systemQualifiedTypeNames)
  })

  // Verify the property names of records are unique.
  typeLibraryDef.recordTypeDefs.forEach(recordTypeDef => {
    ensureRecordTypePropertiesAreUnique(recordTypeDef)
  })

  // Verify the property types of records and ensure the property type
  // is set to a system-qualified version.
  typeLibraryDef.recordTypeDefs.forEach(recordTypeDef => {
    ensureRecordTypePropertiesPropertyTypeAreValid(recordTypeDef, systemQualifiedTypeNames)
  })

  // Create a JSON schema validator that we can use to validate
  // the example, test case and enum data values that are expressed
  // directly in the type definitions using JSON.
  const jsonSchemaValidator = createAjvFromTypeLibraryDef(INTERNAL_DOMAIN, typeLibraryDef)

  // Verify the enum item data items.
  typeLibraryDef.enumTypeDefs.forEach(enumTypeDef => {
    ensureEnumTypeItemsDataIsValid(jsonSchemaValidator, enumTypeDef)
  })

  // Verify the test cases on all the string types
  typeLibraryDef.stringTypeDefs.forEach(stringTypeDef => {
    ensureStringTypeTestCasesAreValid(jsonSchemaValidator, stringTypeDef)
  })

  // Verify the required fields on all the record types
  typeLibraryDef.recordTypeDefs.forEach(recordTypeDef => {
    ensureRecordTypeRequiredFieldsAreValid(recordTypeDef)
  })

  // Verify the test cases on all the record types
  typeLibraryDef.recordTypeDefs.forEach(recordTypeDef => {
    ensureRecordTypeTestCasesAreValid(jsonSchemaValidator, recordTypeDef)
  })

  return typeLibraryDef
}

/**
 * Returns an object containing the parsed yaml contents.
 * @param contents The yaml contents.
 */
function convertYamlStringToObject (contents: string): JsonotronTypeDef {
  try {
    return yaml.safeLoad(contents) as JsonotronTypeDef
  } catch (err) {
    throw new ParseYamlError(contents, err as Error)
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
 * Sorts the given resources into their respective kinds.
 * @param resources An array of Jsonotron resources.
 * @param validators A set of type validators.
 */
function sortResources (resources: JsonotronTypeDef[], validators: TypeDefValidators): TypeLibraryDef {
  const result: TypeLibraryDef = {
    boolTypeDefs: [],
    enumTypeDefs: [],
    floatTypeDefs: [],
    intTypeDefs: [],
    objectTypeDefs: [],
    recordTypeDefs: [],
    stringTypeDefs: []
  }

  resources.forEach(res => {
    switch(res.kind) {
      case 'bool': {
        ensureTypeIsValid(res, validators.boolTypeDefValidator)
        result.boolTypeDefs.push(res)
        break
      }
      case 'enum': {
        ensureTypeIsValid(res, validators.enumTypeDefValidator)
        result.enumTypeDefs.push(res as EnumTypeDef)
        break
      }
      case 'float': {
        ensureTypeIsValid(res, validators.floatTypeDefValidator)
        result.floatTypeDefs.push(res as FloatTypeDef)
        break
      }
      case 'int': {
        ensureTypeIsValid(res, validators.intTypeDefValidator)
        result.intTypeDefs.push(res as IntTypeDef)
        break
      }
      case 'object': {
        ensureTypeIsValid(res, validators.objectTypeDefValidator)
        result.objectTypeDefs.push(res)
        break
      }
      case 'record': {
        ensureTypeIsValid(res, validators.recordTypeDefValidator)
        result.recordTypeDefs.push(res as RecordTypeDef)
        break
      }
      case 'string': {
        ensureTypeIsValid(res, validators.stringTypeDefValidator)
        result.stringTypeDefs.push(res as StringTypeDef)
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
 * Executes the factory methods for any records that refer to factories
 * and replace the contents in the type library accordingly.
 * @param typeLibraryDef A type library.
 * @param factories An array of record factories.
 */
function executeRecordFactories (typeLibraryDef: TypeLibraryDef, factories: RecordFactory[]) {
  const expandedRecordTypes: RecordTypeDef[] = []

  for (const recordTypeDef of typeLibraryDef.recordTypeDefs) {
    if (Array.isArray(recordTypeDef.factories) && recordTypeDef.factories.length > 0) {
      for (const factoryName of recordTypeDef.factories) {
        const factory = factories.find(f => f.name === factoryName)

        if (!factory) {
          throw new UnrecognisedFactoryNameError(factoryName, recordTypeDef.name)
        }

        expandedRecordTypes.push(...factory.implementation(recordTypeDef))
      }
    } else {
      expandedRecordTypes.push(recordTypeDef)
    }
  }

  typeLibraryDef.recordTypeDefs = expandedRecordTypes
}

/**
 * Returns an array of system qualified type names.
 * @param typeLibraryDef A type library.
 */
function extractSystemQualifiedTypeNames (typeLibraryDef: TypeLibraryDef): string[] {
  const result: string[] = []

  result.push(...typeLibraryDef.boolTypeDefs.map(typeDef => `${typeDef.system}/${typeDef.name}`))
  result.push(...typeLibraryDef.enumTypeDefs.map(typeDef => `${typeDef.system}/${typeDef.name}`))
  result.push(...typeLibraryDef.floatTypeDefs.map(typeDef => `${typeDef.system}/${typeDef.name}`))
  result.push(...typeLibraryDef.intTypeDefs.map(typeDef => `${typeDef.system}/${typeDef.name}`))
  result.push(...typeLibraryDef.objectTypeDefs.map(typeDef => `${typeDef.system}/${typeDef.name}`))
  result.push(...typeLibraryDef.recordTypeDefs.map(typeDef => `${typeDef.system}/${typeDef.name}`))
  result.push(...typeLibraryDef.stringTypeDefs.map(typeDef => `${typeDef.system}/${typeDef.name}`))

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
 * @param enumTypeDef An enum type definition.
 * @param systemQualifiedTypeNames An array of system qualified type names.
 */
function ensureEnumTypeDataTypeIsValid (enumTypeDef: EnumTypeDef, systemQualifiedTypeNames: string[]): void {
  if (enumTypeDef.dataType && !systemQualifiedTypeNames.includes(getSystemQualifiedTypeName(enumTypeDef.system, enumTypeDef.dataType))) {
    throw new UnrecognisedDataTypeOnEnumTypeError(enumTypeDef.name, enumTypeDef.dataType)
  }
}

/**
 * Raises an error if the given record type contains multiple properties with the same name.
 * @param recordTypeDef A record type definition.
 */
function ensureRecordTypePropertiesAreUnique (recordTypeDef: RecordTypeDef): void {
  const propertyNames: string[] = []

  recordTypeDef.properties.forEach(property => {
    if (propertyNames.includes(property.name)) {
      throw new DuplicatePropertyNameOnRecordTypeError(recordTypeDef.name, property.name)
    } else {
      propertyNames.push(property.name)
    }
  })
}

/**
 * Raises an error if the given record type describe a property of an unrecognised type.
 * @param recordTypeDef A record type definition.
 * @param systemQualifiedTypeNames An array of system qualified type names.
 */
function ensureRecordTypePropertiesPropertyTypeAreValid (recordTypeDef: RecordTypeDef, systemQualifiedTypeNames: string[]): void {
  recordTypeDef.properties.forEach(property => {
    const qualifiedPropertyType = getSystemQualifiedTypeName(recordTypeDef.system, property.propertyType)

    if (!systemQualifiedTypeNames.includes(qualifiedPropertyType)) {
      throw new UnrecognisedPropertyTypeOnRecordTypeError(recordTypeDef.name, property.name, property.propertyType)
    }

    property.propertyType = qualifiedPropertyType
  })
}

/**
 * Raises an InvalidTypeError if the given type is not valid according
 * to the given validator.
 * @param typeDef The type to validate.
 * @param validator An AJV validator function.
 */
function ensureTypeIsValid (typeDef: JsonotronTypeDef, validator: ValidateFunction) {
  const isValid = validator(typeDef as unknown)

  if (!isValid) {
    throw new InvalidTypeError(typeDef.name, typeDef.kind, ajvErrorsToString(validator.errors))
  }
}

/**
 * Convert validator errors to a string.
 * @param errors An array of error objects.
 */
function ajvErrorsToString (errors?: ErrorObject[]|null) {
  return JSON.stringify(errors, null, 2)
}

/**
 * Validate the data properties of the enum type items.
 * @param jsonSchemaValidator A json schema validator.
 * @param enumTypeDef An enum type definition.
 */
function ensureEnumTypeItemsDataIsValid (jsonSchemaValidator: Ajv, enumTypeDef: EnumTypeDef): void {
  // Only check data if a schema is provided.
  if (enumTypeDef.dataType) {
    // Get the validator.
    const qualifiedDataType = getDomainQualifiedTypeReference(INTERNAL_DOMAIN, enumTypeDef.system, enumTypeDef.dataType)
    const validator = jsonSchemaValidator.getSchema(qualifiedDataType) as ValidateFunction

    // Check the data attached to each item.
    enumTypeDef.items.forEach(item => {
      if (!validator(item.data)) {
        throw new EnumTypeItemDataValidationError(enumTypeDef.name, item.value, ajvErrorsToString(validator.errors))
      }
    })
  }
}

/**
 * Validate the record type required field names.
 * @param recordTypeDef A record type definition.
 */
 function ensureRecordTypeRequiredFieldsAreValid(recordTypeDef: RecordTypeDef): void {
  // Check the required field names.
  recordTypeDef.required?.forEach(propertyName => {
    if (recordTypeDef.properties.findIndex(property => property.name === propertyName) === -1) {
      throw new UnrecognisedPropertyNameOnRecordTypeError(recordTypeDef.name, propertyName)
    }
  })
}

/**
 * Validate the record type test cases and invalid test cases.
 * @param jsonSchemaValidator A json schema validator.
 * @param recordTypeDef A record type definition.
 */
function ensureRecordTypeTestCasesAreValid(jsonSchemaValidator: Ajv, recordTypeDef: RecordTypeDef): void {
  // Get a validator (assume it will be found because they are generated automatically).
  const validator = jsonSchemaValidator.getSchema(`${INTERNAL_DOMAIN}/${recordTypeDef.system}/${recordTypeDef.name}`) as ValidateFunction

  // Check the valid test cases.
  recordTypeDef.validTestCases.forEach((t, index) => {
    if (validator && !validator(t.value)) {
      throw new TestCaseValidationError(recordTypeDef.name, index, ajvErrorsToString(validator.errors))
    }
  })

  // Check the invalid test cases.
  recordTypeDef.invalidTestCases?.forEach((t, index) => {
    if (validator && validator(t.value)) {
      throw new TestCaseInvalidationError(recordTypeDef.name, index)
    }
  })
}

/**
 * Validate the string type test cases and invalid test cases.
 * @param jsonSchemaValidator A json schema validator.
 * @param stringTypeDef A string type definition.
 */
 function ensureStringTypeTestCasesAreValid(jsonSchemaValidator: Ajv, stringTypeDef: StringTypeDef): void {
  // Get a validator (assume it will be found because they are generated automatically).
  const validator = jsonSchemaValidator.getSchema(`${INTERNAL_DOMAIN}/${stringTypeDef.system}/${stringTypeDef.name}`) as ValidateFunction

  // Check the valid test cases.
  stringTypeDef.validTestCases?.forEach((t, index) => {
    if (validator && !validator(t.value)) {
      throw new TestCaseValidationError(stringTypeDef.name, index, ajvErrorsToString(validator.errors))
    }
  })

  // Check the invalid test cases.
  stringTypeDef.invalidTestCases?.forEach((t, index) => {
    if (validator && validator(t.value)) {
      throw new TestCaseInvalidationError(stringTypeDef.name, index)
    }
  })
}
