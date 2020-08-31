import check from 'check-types'
import { createJsonSchemaFragmentForEnumType } from './createJsonSchemaFragmentForEnumType'
import { consts } from '../utils'

/**
 * Creates a JSON Schema for the given enum type.
 * @param {String} enumType The name of a field type.
 */
export function createJsonSchemaForEnumTypeArray (enumType) {
  check.assert.object(enumType)
  check.assert.string(enumType.name)

  return {
    $schema: consts.JSON_SCHEMA_DECLARATION,
    title: `Array of Enum Type "${enumType.name}"`,
    type: 'array',
    items: {
      ...createJsonSchemaFragmentForEnumType(enumType)
    }
  }
}
