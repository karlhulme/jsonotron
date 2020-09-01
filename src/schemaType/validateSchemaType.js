import { createCustomisedAjv, ValidationResult } from '../jsonSchemaValidation'
import { createSchemaTypeSchema } from './createSchemaTypeSchema'

/**
 * @typedef {import('ajv').Ajv} Ajv
 */

/**
 * Validates the given schemaType against a schemaType schema,
 * using the given Ajv, and
 * adds any errors to the given ValidationResult.
 * @param {ValidationResult} result A validation result.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} schemaType A schema type.
 */
function validateWithSchema (result, ajv, schemaType) {
  const schemaTypeSchema = createSchemaTypeSchema()
  const validator = ajv.compile(schemaTypeSchema)

  if (!validator(schemaType)) {
    validator.errors.forEach(error => {
      result.addError(schemaType.name, 'Failed to validate against schemaType schema.', error)
    })
  }
}

/**
 * Validates the given schemaType against a schemaType schema
 * that includes the documentation and the testing,
 * using the given Ajv, and
 * adds any unseen errors to the given ValidationResult as warnings.
 * @param {ValidationResult} result A validation result.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} schemaType A schema type.
 */
function validateWithDocsAndTestsSchema (result, ajv, schemaType) {
  const schemaTypeDocsAndTestsSchema = createSchemaTypeSchema({ includeDocs: true, includeTests: true })
  const docsAndTestsValidator = ajv.compile(schemaTypeDocsAndTestsSchema)

  if (!docsAndTestsValidator(schemaType)) {
    docsAndTestsValidator.errors.forEach(error => {
      if (!result.containsError(error)) {
        result.addWarning(schemaType.name, 'Failed to validate against schemaType schema with documentation and test values.', error)
      }
    })
  }
}

/**
 * Validates the given schema type and returns a ValidationResult.
 * The validation process ensures that the required fields are present
 * but it does not compile the json schema or check that test cases and examples
 * conform to it.
 * @param {Object} schemaType A schema type.
 */
export function validateSchemaType (schemaType) {
  const result = new ValidationResult()
  const ajv = createCustomisedAjv()

  validateWithSchema(result, ajv, schemaType)
  validateWithDocsAndTestsSchema(result, ajv, schemaType)

  return result
}
