import { createTypeProcError } from '../shared/index.js'
import { createSchemaTypeSchema } from './createSchemaTypeSchema.js'

/**
 * @typedef {import('ajv').Ajv} Ajv
 */

/**
 * Validates the given schemaType against a schema type schema,
 * using the given Ajv, and returns an array of TypeProcErrors.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} schemaType A schema type.
 * @param {Boolean} includeDocs True if the documentation should be also be validated.
 */
function validateWithSchema (ajv, schemaType, includeDocs) {
  const schemaTypeSchema = createSchemaTypeSchema({ includeDocs })
  const validator = ajv.compile(schemaTypeSchema)

  return validator(schemaType)
    ? []
    : validator.errors.map(error => createTypeProcError(schemaType.name, 'Schema Type has invalid or missing properties.', error))
}

/**
 * Validates the given schema type and records any error or warnings using the given functions.
 * The validation process ensures that the required fields are present
 * but it does not compile the json schema or check that test cases and examples
 * conform to it.
 * Returns true if the schema type successfully validated.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} enumType An enum type.
 * @param {Function} recordErrorFunc A function for recording TypeProcErrors.
 * @param {Boolean} includeDocs True if the documentation should be also be validated.
 */
export function validateSchemaType (ajv, schemaType, recordErrorFunc, includeDocs) {
  const schemaErrors = validateWithSchema(ajv, schemaType, includeDocs)

  schemaErrors.forEach(error => recordErrorFunc(error))

  return schemaErrors.length === 0
}
