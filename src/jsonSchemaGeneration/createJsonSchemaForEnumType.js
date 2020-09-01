import check from 'check-types'
import { consts } from '../utils'
import { createJsonSchemaFragmentForEnumType } from './createJsonSchemaFragmentForEnumType'

/**
 * Creates a JSON Schema for the given enum type.
 * @param {String} enumType The name of a field type.
 */
export function createJsonSchemaForEnumType (enumType) {
  check.assert.object(enumType)
  check.assert.string(enumType.name)

  return {
    $schema: consts.JSON_SCHEMA_DECLARATION,
    title: `Enum Type "${enumType.name}"`,
    ...createJsonSchemaFragmentForEnumType(enumType)
  }
}
