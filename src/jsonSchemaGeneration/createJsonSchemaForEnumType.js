import check from 'check-types'
import { JSON_SCHEMA_DECLARATION } from '../shared/index.js'
import { createJsonSchemaFragmentForEnumType } from './createJsonSchemaFragmentForEnumType.js'

/**
 * Creates a JSON Schema for the given enum type.
 * @param {Object} enumType An enum type.
 */
export function createJsonSchemaForEnumType (enumType) {
  check.assert.object(enumType)
  check.assert.string(enumType.name)

  return {
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Enum Type "${enumType.name}"`,
    ...createJsonSchemaFragmentForEnumType(enumType)
  }
}
