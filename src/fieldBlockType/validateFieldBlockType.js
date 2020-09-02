import { ValidationResult } from '../jsonSchemaValidation'
import { createFieldBlockTypeSchema } from './createFieldBlockTypeSchema'

/**
 * @typedef {import('ajv').Ajv} Ajv
 */

/**
 * Validates the given field block type against a fieldBlockType schema,
 * using the given Ajv, and
 * adds any errors to the given ValidationResult.
 * @param {ValidationResult} result A Validation result.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} fieldBlockType A field block type.
 */
function validateWithSchema (result, ajv, fieldBlockType) {
  const fieldBlockTypeSchema = createFieldBlockTypeSchema()
  const validator = ajv.compile(fieldBlockTypeSchema)

  if (!validator(fieldBlockType)) {
    validator.errors.forEach(error => {
      result.addError(fieldBlockType.name, 'Field Block Type has invalid or missing properties.', error)
    })
  }
}

/**
 * Validates the given field block type against a fieldBlockType schema
 * that includes the documentation,
 * using the given Ajv, and
 * adds any unseen errors to the given ValidationResult as warnings.
 * @param {ValidationResult} result A Validation result.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} fieldBlockType A field block type.
 */
function validateWithDocsSchema (result, ajv, fieldBlockType) {
  const fieldBlockTypeDocsSchema = createFieldBlockTypeSchema({ includeDocs: true })
  const docsValidator = ajv.compile(fieldBlockTypeDocsSchema)

  if (!docsValidator(fieldBlockType)) {
    docsValidator.errors.forEach(error => {
      if (!result.containsError(error)) {
        result.addWarning(fieldBlockType.name, 'Field Block Type has missing documentation.', error)
      }
    })
  }
}

/**
 * Validates the given field block type and returns a ValidationResult.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} fieldBlockType A field block type.
 */
export function validateFieldBlockType (ajv, fieldBlockType) {
  const result = new ValidationResult()

  validateWithSchema(result, ajv, fieldBlockType)
  validateWithDocsSchema(result, ajv, fieldBlockType)

  return result
}
