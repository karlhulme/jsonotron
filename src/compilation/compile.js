import check from 'check-types'
import { patchEnumType, validateEnumType } from '../enumType'
import { patchFieldBlockDefinition, validateFieldBlockDefinition } from '../fieldBlockDefinition'
import { patchSchemaType, validateSchemaType } from '../schemaType'
import { createJsonSchemaForFieldBlock, createJsonSchemaForSchemaType, createJsonSchemaForEnumType } from '../jsonSchemaGeneration'
import { createCustomisedAjv } from '../jsonSchemaValidation'
import { TypeSystem } from '../shared'

/**
 * @typedef {import('ajv').Ajv} Ajv
 */

/**
 * Validates the enum types, patching and adding those that are successfully validated to the given result.
 * @param {TypeSystem} typeSystem A type system.
 * @param {Ajv} ajv A json validator.
 * @param {Object} enumType An enun type.
 */
function validateAndPatchEnumType (typeSystem, ajv, enumType) {
  const enumTypeValidationResult = validateEnumType(ajv, enumType)

  if (enumTypeValidationResult.isSuccessful()) {
    typeSystem.addPatchedEnumType(patchEnumType(enumType))
  }

  enumTypeValidationResult.getErrors().forEach(error => typeSystem.addErrorObject(error))
  enumTypeValidationResult.getWarnings().forEach(warning => typeSystem.addWarningObject(warning))
}

/**
 * Validates the schema types, patching and adding those that are successfully validated to the given result.
 * @param {TypeSystem} typeSystem A type system.
 * @param {Ajv} ajv A json validator.
 * @param {Object} schemaType A schema type.
 */
function validateAndPatchSchemaType (typeSystem, ajv, schemaType) {
  const schemaTypeValidationResult = validateSchemaType(ajv, schemaType)

  if (schemaTypeValidationResult.isSuccessful()) {
    typeSystem.addPatchedSchemaType(patchSchemaType(schemaType))
  }

  schemaTypeValidationResult.getErrors().forEach(error => typeSystem.addErrorObject(error))
  schemaTypeValidationResult.getWarnings().forEach(warning => typeSystem.addWarningObject(warning))
}

/**
 * Validates the field block definition, patching and adding those that are successfully validated to the given result.
 * @param {TypeSystem} typeSystem A type system.
 * @param {Ajv} ajv A json validator.
 * @param {Object} fieldBlockDefinition A field block definition.
 */
function validateAndPatchFieldBlockDefinition (typeSystem, ajv, fieldBlockDefinition) {
  const fieldBlockDefinitionValidationResult = validateFieldBlockDefinition(ajv, fieldBlockDefinition)

  if (fieldBlockDefinitionValidationResult.isSuccessful()) {
    typeSystem.addPatchedFieldBlockDefinition(patchFieldBlockDefinition(fieldBlockDefinition))
  }

  fieldBlockDefinitionValidationResult.getErrors().forEach(error => typeSystem.addErrorObject(error))
  // no mechanism for field block definitions to produce warnings because they are not documented.
  // fieldBlockDefinitionValidationResult.getWarnings().forEach(warning => typeSystem.addWarningObject(warning))
}

/**
 * Generate a json schema for the given schemaType using the other arrays
 * if they are referenced.
 * If the schema generation fails then the error will be recorded in the result.
 * @param {TypeSystem} result A type system.
 * @param {Object} schemaType A schema type to generate a schema for.
 * @param {Array} schemaTypes An array of schema types.
 * @param {Array} enumTypes An array of enum types.
 */
function generateJsonSchemaForSchemaType (result, schemaType, schemaTypes, enumTypes) {
  try {
    return createJsonSchemaForSchemaType(schemaType, schemaTypes, enumTypes)
  } catch (err) {
    result.addError(schemaType.name, 'Schema Type JSON Schema generation failed.', { message: err.toString() })
  }
}

/**
 * Generate a json schema for the given fieldBlockDefinition.
 * If the schema generation fails then the error will be recorded in the result.
 * @param {TypeSystem} result A type system.
 * @param {Object} fieldBlockDefinition A field block definition to generate a schema for.
 * @param {Array} schemaTypes An array of schema types.
 * @param {Array} enumTypes An array of enum types.
 */
function generateJsonSchemaForFieldBlockDefinition (result, fieldBlockDefinition, schemaTypes, enumTypes) {
  try {
    return createJsonSchemaForFieldBlock(fieldBlockDefinition, schemaTypes, enumTypes)
  } catch (err) {
    result.addError(fieldBlockDefinition.name, 'Field Block Type JSON Schema generation failed.', { message: err.toString() })
  }
}

/**
 * Returns a function (value) that returns true if the given value conforms to the given json schema.
 * If the compilation fails then the error will be recorded in the result.
 * @param {TypeSystem} result A type system.
 * @param {Ajv} ajv A json validator.
 * @param {String} typeName The name of the type used to generate the JSON schema.
 * @param {Object} jsonSchema A json schema.
 */
function compileJsonSchema (result, ajv, typeName, jsonSchema) {
  try {
    return ajv.compile(jsonSchema)
  } catch (err) {
    result.addError(typeName, 'Type compilation failed.  If type is a schemaType then review its jsonSchema.', { message: err.toString() })
    return null
  }
}

/**
 * Checks that the examples on the schema type conform to the json schema.
 * If not, errors are added to the type system.
 * @param {TypeSystem} result A type system.
 * @param {Function} validator A function that returns true if the sole parameter conforms to a pre-set json schema.
 * @param {Object} schemaType A schema type.
 */
function verifySchemaTypeExamples (result, validator, schemaType) {
  schemaType.examples.forEach((example, index) => {
    if (!validator(example.value)) {
      validator.errors.forEach(error => {
        // include the error message in the templated string so that each error has a unique message.
        result.addError(schemaType.name, `Verification failed for examples[${index}]: ${error.message}`, error)
      })
    }
  })
}

/**
 * Checks that the valid test cases on the schema type conform to the json schema.
 * If not, errors are added to the type system.
 * @param {TypeSystem} result A type system.
 * @param {Function} validator A function that returns true if the sole parameter conforms to a pre-set json schema.
 * @param {Object} schemaType A schema type.
 */
function verifySchemaTypeValidTestCases (result, validator, schemaType) {
  schemaType.validTestCases.forEach((validTestCase, index) => {
    if (!validator(validTestCase)) {
      validator.errors.forEach(error => {
        // include the error message in the templated string so that each error has a unique message.
        result.addError(schemaType.name, `Verification failed for validTestCases[${index}]: ${error.message}`, error)
      })
    }
  })
}

/**
 * Checks that the invalid test cases on the schema type do not conform to the json schema.
 * If they unexpectedly pass, then errors are added to the type system.
 * @param {TypeSystem} result A type system.
 * @param {Function} validator A function that returns true if the sole parameter conforms to a pre-set json schema.
 * @param {Object} schemaType A schema type.
 */
function verifySchemaTypeInvalidTestCases (result, validator, schemaType) {
  schemaType.invalidTestCases.forEach((invalidTestCase, index) => {
    if (validator(invalidTestCase)) {
      result.addError(schemaType.name, `Verification passed (but should have failed) for invalidTestCases[${index}].`, { message: 'Validation was expected to fail but passed.' })
    }
  })
}

/**
 * Checks that the default values on any fields in the field block definition conform to the json schema.
 * If not, errors are added to the type system.
 * @param {TypeSystem} result A type system.
 * @param {Object} fieldBlockDefinition A field block definition.
 */
function verifyFieldBlockDefinitionDefaultValues (result, fieldBlockDefinition) {
  Object.keys(fieldBlockDefinition.fields).forEach(fieldName => {
    const field = fieldBlockDefinition.fields[fieldName]

    if (typeof field.default !== 'undefined') {
      const fieldTypeValidationResult = result.executeFieldTypeValidator(field.type, field.default)
      check.assert(fieldTypeValidationResult.found, 'Validator was not found for default value.')

      if (!fieldTypeValidationResult.validated) {
        fieldTypeValidationResult.errors.forEach(error => {
          // include the error message in the templated string so that each error has a unique message.
          result.addError(fieldBlockDefinition.name, `Verification failed for default value of field '${fieldName}': ${error.message}`, error)
        })
      }
    }
  })
}

/**
 * Returns a TypeSystem that describes which parts of the type system
 * described by the given enum types, schema types and format validators is valid.
 * @param {Object} resources An object that contains resources to be used in the compilation.
 * @param {Array} [resources.enumTypes] An array of enum types.
 * @param {Array} [resources.schemaTypes] An array of schema types.
 * @param {Array} [resources.formatValidators] An array of format validators.
 * @param {Array} [resources.fieldBlockDefinitions] An array of field block definitions.
 * @returns {TypeSystem}
 */
export function compile ({ enumTypes = [], schemaTypes = [], formatValidators = [], fieldBlockDefinitions = [] } = {}) {
  check.assert.array.of.object(enumTypes)
  check.assert.array.of.object(schemaTypes)
  check.assert.array.of.object(formatValidators)
  check.assert.array.of.object(fieldBlockDefinitions)

  const ajv = createCustomisedAjv(formatValidators)
  const typeSystem = new TypeSystem()

  enumTypes.forEach(enumType => validateAndPatchEnumType(typeSystem, ajv, enumType))
  schemaTypes.forEach(schemaType => validateAndPatchSchemaType(typeSystem, ajv, schemaType))
  fieldBlockDefinitions.forEach(fieldBlockDefinition => validateAndPatchFieldBlockDefinition(typeSystem, ajv, fieldBlockDefinition))

  typeSystem.getPatchedEnumTypes().forEach(enumType => {
    const jsonSchema = createJsonSchemaForEnumType(enumType)
    const validator = compileJsonSchema(typeSystem, ajv, enumType.name, jsonSchema)
    typeSystem.addEnumTypeValidator(enumType.name, validator)
  })

  typeSystem.getPatchedSchemaTypes().forEach(schemaType => {
    const jsonSchema = generateJsonSchemaForSchemaType(typeSystem, schemaType, typeSystem.getPatchedSchemaTypes(), typeSystem.getPatchedEnumTypes())

    if (jsonSchema) {
      const validator = compileJsonSchema(typeSystem, ajv, schemaType.name, jsonSchema)

      if (validator) {
        verifySchemaTypeExamples(typeSystem, validator, schemaType)
        verifySchemaTypeValidTestCases(typeSystem, validator, schemaType)
        verifySchemaTypeInvalidTestCases(typeSystem, validator, schemaType)
        typeSystem.addSchemaTypeValidator(schemaType.name, validator)
      }
    }
  })

  typeSystem.getPatchedFieldBlockDefinitions().forEach(fieldBlockDefinition => {
    const jsonSchema = generateJsonSchemaForFieldBlockDefinition(typeSystem, fieldBlockDefinition, typeSystem.getPatchedSchemaTypes(), typeSystem.getPatchedEnumTypes())

    if (jsonSchema) {
      const validator = compileJsonSchema(typeSystem, ajv, fieldBlockDefinition.name, jsonSchema)

      if (validator) {
        verifyFieldBlockDefinitionDefaultValues(typeSystem, fieldBlockDefinition)
        typeSystem.addFieldBlockDefinitionValidator(fieldBlockDefinition.name, validator)
      }
    }
  })

  return typeSystem
}
