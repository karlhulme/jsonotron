import { createEnumTypeSchema } from './createEnumTypeSchema.js'
import { createTypeProcError } from '../shared/index.js'

/**
 * @typedef {import('ajv').Ajv} Ajv
 */

/**
 * Validates the given enumType against an enum type schema,
 * using the given Ajv, and returns an array of TypeProcErrors.
 * @param {Ajv} ajv A json schema validator.
 * @param {Object} enumType An enum type.
 * @param {Boolean} includeDocs True if the documentation should be also be validated.
 */
function validateWithSchema (ajv, enumType, includeDocs) {
  const enumTypeSchema = createEnumTypeSchema({ includeDocs })
  const validator = ajv.compile(enumTypeSchema)

  return validator(enumType)
    ? []
    : validator.errors.map(error => createTypeProcError(enumType.name, 'Enum Type has invalid or missing properties.', error))
}

/**
 * Validates the uniqueness of the item values and returns an array of TypeProcErrors.
 * @param {Object} enumType An enum type object to check.
 */
function validateItemValuesAreUnique (enumType) {
  const seen = []
  const errors = []

  enumType.items.forEach((item, index) => {
    if (seen.includes(item.value)) {
      errors.push(createTypeProcError(enumType.name, `Enum Type has value '${item.value}' at index ${index} that is not unique.`, { dataPath: `items[${index}].value` }))
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
 * @param {Function} recordErrorFunc A function for recording TypeProcErrors.
 * @param {Boolean} includeDocs True if the documentation should be also be validated.
 */
export function validateEnumType (ajv, enumType, recordErrorFunc, includeDocs) {
  const schemaErrors = validateWithSchema(ajv, enumType, includeDocs)

  // check we don't have any schemas errors before trying to validate further.
  const itemErrors = schemaErrors.length === 0
    ? validateItemValuesAreUnique(enumType)
    : []

  const combinedErrors = schemaErrors.concat(itemErrors)

  combinedErrors.forEach(error => recordErrorFunc(error))

  return combinedErrors.length === 0
}
