import check from 'check-types'
import { patchEnumType, validateEnumType } from '../enumType'
import { patchSchemaType, validateSchemaType } from '../schemaType'
import { createJsonSchemaForSchemaType } from '../jsonSchemaGeneration'
import { createCustomisedAjv, ValidationResult } from '../utils'

/**
 * Returns an array of validated and patched enum types.  The result will
 * be populated with the details of enum types that failed validation.
 * @param {ValidationResult} result A validation result.
 * @param {Array} enumTypes An array of enum types.
 */
function getValidatedAndPatchedEnumTypes (result, enumTypes) {
  const validatedEnumTypes = []

  enumTypes.forEach(enumType => {
    const enumTypeValidationResult = validateEnumType(enumType)

    if (enumTypeValidationResult.isSuccessful()) {
      validatedEnumTypes.push(patchEnumType(enumType))
    }

    result.addExisting(enumTypeValidationResult)
  })

  return validatedEnumTypes
}

/**
 * Returns an array of validated and patched schema types.  The result will
 * be populated with the details of schema types that failed validation.
 * @param {ValidationResult} result A validation result.
 * @param {Array} schemaTypes An array of schema types.
 */
function getValidatedAndPatchedSchemaTypes (result, schemaTypes) {
  const validatedSchemaTypes = []

  schemaTypes.forEach(schemaType => {
    const schemaTypeValidationResult = validateSchemaType(schemaType)

    if (schemaTypeValidationResult.isSuccessful()) {
      validatedSchemaTypes.push(patchSchemaType(schemaType))
    }

    result.addExisting(schemaTypeValidationResult)
  })

  return validatedSchemaTypes
}

/**
 * Generate a json schema for the given schemaType using the other arrays
 * if they are referenced.
 * If the schema generation fails then the error will be recorded in the result.
 * @param {ValidationResult} result A validation result.
 * @param {Object} schemaType A schema type to generate a schema for.
 * @param {Array} schemaTypes An array of schema types.
 * @param {Array} enumTypes An array of enum types.
 */
function generateJsonSchemaForSchemaType (result, schemaType, schemaTypes, enumTypes) {
  try {
    return createJsonSchemaForSchemaType(schemaType, schemaTypes, enumTypes)
  } catch (err) {
    result.addError(schemaType.name, `Schema generation failed for Schema Type '${schemaType.name}'.`, { message: err.toString() })
  }
}

/**
 * Returns a function (value) that returns true if the given value conforms to the given json schema.
 * If the compilation fails then the error will be recorded in the result.
 * @param {ValidationResult} result A validation result.
 * @param {Ajv} ajv A json validator.
 * @param {Object} schemaType A schema type.
 * @param {Object} jsonSchema A json schema.
 */
function createValidatorForSchemaType (result, ajv, schemaType, jsonSchema) {
  try {
    return ajv.compile(jsonSchema)
  } catch (err) {
    result.addError(schemaType.name, `Compilation failed for Schema Type '${schemaType.name}'.`, { message: err.toString() })
    return null
  }
}

/**
 * Checks that the examples on the schema type conform to the json schema.
 * If not, errors are added to the validation result.
 * @param {ValidationResult} result A validation result.
 * @param {Function} validator A function that returns true if the sole parameter conforms to a pre-set json schema.
 * @param {Object} schemaType A schema type.
 */
function validateExamples (result, validator, schemaType) {
  schemaType.examples.forEach((example, index) => {
    if (!validator(example.value)) {
      validator.errors.forEach(error => {
        result.addError(schemaType.name, `Validation failed for examples[${index}] on Schema Type '${schemaType.name}': ${error.message}`, error)
      })
    }
  })
}

/**
 * Checks that the valid test cases on the schema type conform to the json schema.
 * If not, errors are added to the validation result.
 * @param {ValidationResult} result A validation result.
 * @param {Function} validator A function that returns true if the sole parameter conforms to a pre-set json schema.
 * @param {Object} schemaType A schema type.
 */
function validateValidTestCases (result, validator, schemaType) {
  schemaType.validTestCases.forEach((validTestCase, index) => {
    if (!validator(validTestCase)) {
      validator.errors.forEach(error => {
        result.addError(schemaType.name, `Validation failed for validTestCases[${index}] on Schema Type '${schemaType.name}': ${error.message}`, error)
      })
    }
  })
}

/**
 * Checks that the invalid test cases on the schema type do not conform to the json schema.
 * If they unexpectedly pass, then errors are added to the validation result.
 * @param {ValidationResult} result A validation result.
 * @param {Function} validator A function that returns true if the sole parameter conforms to a pre-set json schema.
 * @param {Object} schemaType A schema type.
 */
function validateInvalidTestCases (result, validator, schemaType) {
  schemaType.invalidTestCases.forEach((invalidTestCase, index) => {
    if (validator(invalidTestCase)) {
      result.addError(schemaType.name, `Validation passed (but should have failed) for invalidTestCases[${index}] on Schema Type '${schemaType.name}'.`, { dataPath: `invalidTestCases[${index}]` })
    }
  })
}

/**
 * Returns a ValidationResult that describes which parts of the type system
 * described by the given enum types, schema types and format validators is valid.
 * @param {Array} enumTypes An array of enum types.
 * @param {Array} schemaTypes An array of schema types.
 * @param {Array} formatValidators An array of format validators.
 */
export function validateTypeSystem (enumTypes, schemaTypes, formatValidators) {
  check.assert.array.of.object(enumTypes)
  check.assert.array.of.object(schemaTypes)
  check.assert.array.of.object(formatValidators)

  const ajv = createCustomisedAjv(formatValidators)
  const result = new ValidationResult()

  const validatedEnumTypes = getValidatedAndPatchedEnumTypes(result, enumTypes)
  const validatedSchemaTypes = getValidatedAndPatchedSchemaTypes(result, schemaTypes)

  validatedSchemaTypes.forEach(schemaType => {
    const jsonSchema = generateJsonSchemaForSchemaType(result, schemaType, validatedSchemaTypes, validatedEnumTypes)

    if (jsonSchema) {
      const validator = createValidatorForSchemaType(result, ajv, schemaType, jsonSchema)

      if (validator) {
        validateExamples(result, validator, schemaType)
        validateValidTestCases(result, validator, schemaType)
        validateInvalidTestCases(result, validator, schemaType)
      }
    }
  })

  return result
}
