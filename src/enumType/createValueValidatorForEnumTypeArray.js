import check from 'check-types'
import { createJsonSchemaForEnumTypeArray } from './createJsonSchemaForEnumTypeArray'

/**
 * Returns a validator function for the given enum type array.
 * @param {Object} ajv A JSON schema validator.
 * @param {String} enumType An enum type.
 */
export function createValueValidatorForEnumTypeArray (ajv, enumType) {
  check.assert.object(ajv)
  check.assert.object(enumType)

  const enumValueSchema = createJsonSchemaForEnumTypeArray(enumType)
  return ajv.compile(enumValueSchema)
}
