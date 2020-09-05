import { createFieldBlockDefinitionSchema } from './createFieldBlockDefinitionSchema'
import { createErrorOrWarning } from '../shared'

/**
 * @typedef {import('ajv').Ajv} Ajv
 */

/**
 * Validates the given field block type against a fieldBlockDefinition schema,
 * using the given Ajv, and returns any errors.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} fieldBlockDefinition A field block type.
 */
function validateWithSchema (ajv, fieldBlockDefinition) {
  const fieldBlockDefinitionSchema = createFieldBlockDefinitionSchema()
  const validator = ajv.compile(fieldBlockDefinitionSchema)

  return validator(fieldBlockDefinition)
    ? []
    : validator.errors.map(error => createErrorOrWarning(fieldBlockDefinition.name, 'Field Block Definition has invalid or missing properties.', error))
}

/**
 * Validates the given field block definition.
 * Returns true if the field block definition successfully validated.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} fieldBlockDefinition A field block type.
 * @param {Function} recordErrorFunc A function for recording validation errors.
 */
export function validateFieldBlockDefinition (ajv, fieldBlockDefinition, recordErrorFunc) {
  const schemaErrors = validateWithSchema(ajv, fieldBlockDefinition)
  schemaErrors.forEach(error => recordErrorFunc(error))

  return schemaErrors.length === 0
}
