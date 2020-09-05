import { createEnumTypeSchema } from './createEnumTypeSchema'
import { arrayContainsErrorOrWarningWithAjvDetails, createErrorOrWarning } from '../shared'

/**
 * @typedef {import('ajv').Ajv} Ajv
 */

/**
 * Validates the given enumType against an enumType schema,
 * using the given Ajv, and returns any errors.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} enumType An enum type.
 */
function validateWithSchema (ajv, enumType) {
  const enumTypeSchema = createEnumTypeSchema()
  const validator = ajv.compile(enumTypeSchema)

  return validator(enumType)
    ? []
    : validator.errors.map(error => createErrorOrWarning(enumType.name, 'Enum Type has invalid or missing properties.', error))
}

/**
 * Validates the given enumType against an enumType schema
 * that includes the documentation,
 * using the given Ajv, and returns any unseen errors.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} enumType An enum type.
 * @param {Array} existingErrors An array of existings.
 */
function validateWithDocsSchema (ajv, enumType, existingErrors) {
  const enumTypeDocsSchema = createEnumTypeSchema({ includeDocs: true })
  const docsValidator = ajv.compile(enumTypeDocsSchema)

  return docsValidator(enumType)
    ? []
    : docsValidator.errors
      .filter(error => !arrayContainsErrorOrWarningWithAjvDetails(existingErrors, error))
      .map(error => createErrorOrWarning(enumType.name, 'Enum Type has missing documentation.', error))
}

/**
 * Adds an error to the result if any of the item values are not unique.
 * @param {Object} enumType An enum type object to check.
 */
function validateItemValuesAreUnique (enumType) {
  const seen = []
  const errors = []

  enumType.items.forEach((item, index) => {
    if (seen.includes(item.value)) {
      errors.push(createErrorOrWarning(enumType.name, `Enum Type has value '${item.value}' at index ${index} that is not unique.`, { dataPath: `items[${index}].value` }))
    } else {
      seen.push(item.value)
    }
  })

  return errors
}

/**
 * Validates the given schema type and records any error or warnings using the given functions.
 * Returns true if the enum type successfully validated.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} enumType An enum type.
 * @param {Function} recordErrorFunc A function for recording validation errors.
 * @param {Function} recordWarningFunc A function for recording validation warnings.
 */
export function validateEnumType (ajv, enumType, recordErrorFunc, recordWarningFunc) {
  const schemaErrors = validateWithSchema(ajv, enumType)
  const docWarnings = validateWithDocsSchema(ajv, enumType, schemaErrors)

  // check we don't have any schemas errors before trying to validate further.
  const itemErrors = schemaErrors.length === 0
    ? validateItemValuesAreUnique(enumType)
    : []

  const combinedErrors = schemaErrors.concat(itemErrors)

  combinedErrors.forEach(error => recordErrorFunc(error))
  docWarnings.forEach(warning => recordWarningFunc(warning))

  return combinedErrors.length === 0
}
