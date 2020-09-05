import { createSchemaTypeSchema } from './createSchemaTypeSchema'
import { arrayContainsErrorOrWarningWithAjvDetails, createErrorOrWarning } from '../shared'

/**
 * @typedef {import('ajv').Ajv} Ajv
 */

/**
 * Validates the given schemaType against a schemaType schema,
 * using the given Ajv, and returns any errors.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} schemaType A schema type.
 */
function validateWithSchema (ajv, schemaType) {
  const schemaTypeSchema = createSchemaTypeSchema()
  const validator = ajv.compile(schemaTypeSchema)

  return validator(schemaType)
    ? []
    : validator.errors.map(error => createErrorOrWarning(schemaType.name, 'Schema Type has invalid or missing properties.', error))
}

/**
 * Validates the given schemaType against a schemaType schema
 * that includes the documentation and the testing,
 * using the given Ajv, and returns any unseen errors.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} schemaType A schema type.
 * @param {Array} existingErrors An array of errors already registered.
 */
function validateWithDocsAndTestsSchema (ajv, schemaType, existingErrors) {
  const schemaTypeDocsAndTestsSchema = createSchemaTypeSchema({ includeDocs: true, includeTests: true })
  const docsAndTestsValidator = ajv.compile(schemaTypeDocsAndTestsSchema)

  return docsAndTestsValidator(schemaType)
    ? []
    : docsAndTestsValidator.errors
      .filter(error => !arrayContainsErrorOrWarningWithAjvDetails(existingErrors, error))
      .map(error => createErrorOrWarning(schemaType.name, 'Enum Type has missing documentation.', error))
}

/**
 * Validates the given schema type and records any error or warnings using the given functions.
 * The validation process ensures that the required fields are present
 * but it does not compile the json schema or check that test cases and examples
 * conform to it.
 * Returns true if the schema type successfully validated.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} enumType An enum type.
 * @param {Function} recordErrorFunc A function for recording validation errors.
 * @param {Function} recordWarningFunc A function for recording validation warnings.
 */
export function validateSchemaType (ajv, schemaType, recordErrorFunc, recordWarningFunc) {
  const schemaErrors = validateWithSchema(ajv, schemaType)
  const docWarnings = validateWithDocsAndTestsSchema(ajv, schemaType, schemaErrors)

  schemaErrors.forEach(error => recordErrorFunc(error))
  docWarnings.forEach(warning => recordWarningFunc(warning))

  return schemaErrors.length === 0
}
