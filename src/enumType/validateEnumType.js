import { ValidationResult } from '../jsonSchemaValidation'
import { createEnumTypeSchema } from './createEnumTypeSchema'

/**
 * @typedef {import('ajv').Ajv} Ajv
 */

/**
 * Validates the given enumType against an enumType schema,
 * using the given Ajv, and
 * adds any errors to the given ValidationResult.
 * @param {ValidationResult} result A validation result.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} enumType An enum type.
 */
function validateWithSchema (result, ajv, enumType) {
  const enumTypeSchema = createEnumTypeSchema()
  const validator = ajv.compile(enumTypeSchema)

  if (!validator(enumType)) {
    validator.errors.forEach(error => {
      result.addError(enumType.name, 'Enum Type has invalid or missing properties.', error)
    })
  }
}

/**
 * Validates the given enumType against an enumType schema
 * that includes the documentation,
 * using the given Ajv, and
 * adds any unseen errors to the given ValidationResult as warnings.
 * @param {ValidationResult} result A validation result.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} enumType An enum type.
 */
function validateWithDocsSchema (result, ajv, enumType) {
  const enumTypeDocsSchema = createEnumTypeSchema({ includeDocs: true })
  const docsValidator = ajv.compile(enumTypeDocsSchema)

  if (!docsValidator(enumType)) {
    docsValidator.errors.forEach(error => {
      if (!result.containsError(error)) {
        result.addWarning(enumType.name, 'Enum Type has missing documentation.', error)
      }
    })
  }
}

/**
 * Adds an error to the result if any of the item values are not unique.
 * @param {ValidationResult} result A validation result.
 * @param {Object} enumType An enum type object to check.
 */
function validateItemValuesAreUnique (result, enumType) {
  const seen = []

  enumType.items.forEach((item, index) => {
    if (seen.includes(item.value)) {
      result.addError(enumType.name, `Enum Type has value '${item.value}' at index ${index} that is not unique.`, { dataPath: `items[${index}].value` })
    } else {
      seen.push(item.value)
    }
  })
}

/**
 * Validates the given enum type and places the results into the given validation result.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} enumType An enum type.
 */
export function validateEnumType (ajv, enumType) {
  const result = new ValidationResult()

  validateWithSchema(result, ajv, enumType)
  validateWithDocsSchema(result, ajv, enumType)

  // this interim check means that for subsequent validation functions we can assume that
  // any present data has the correct types.
  if (result.isSuccessful()) {
    validateItemValuesAreUnique(result, enumType)
  }

  return result
}
