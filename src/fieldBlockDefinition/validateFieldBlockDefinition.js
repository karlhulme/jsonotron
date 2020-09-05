import { ValidationResult } from '../jsonSchemaValidation'
import { createFieldBlockDefinitionSchema } from './createFieldBlockDefinitionSchema'

/**
 * @typedef {import('ajv').Ajv} Ajv
 */

/**
 * Validates the given field block type against a fieldBlockDefinition schema,
 * using the given Ajv, and
 * adds any errors to the given ValidationResult.
 * @param {ValidationResult} result A Validation result.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} fieldBlockDefinition A field block type.
 */
function validateWithSchema (result, ajv, fieldBlockDefinition) {
  const fieldBlockDefinitionSchema = createFieldBlockDefinitionSchema()
  const validator = ajv.compile(fieldBlockDefinitionSchema)

  if (!validator(fieldBlockDefinition)) {
    validator.errors.forEach(error => {
      result.addError(fieldBlockDefinition.name, 'Field Block Definition has invalid or missing properties.', error)
    })
  }
}

/**
 * Validates the given field block type and returns a ValidationResult.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} fieldBlockDefinition A field block type.
 */
export function validateFieldBlockDefinition (ajv, fieldBlockDefinition) {
  const result = new ValidationResult()

  validateWithSchema(result, ajv, fieldBlockDefinition)

  return result
}
