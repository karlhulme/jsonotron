import check from 'check-types'
import { JSON_SCHEMA_DECLARATION } from '../shared'
import { createJsonSchemaFragmentForSchemaType } from './createJsonSchemaFragmentForSchemaType'
import { createJsonSchemaDefinitionsSection } from './createJsonSchemaDefinitionsSection'

/**
 * Creates a JSON Schema for the given schema type.
 * @param {Object} schemaType A schema type.
 * @param {Array} schemaTypes An array of schema types that may be referenced by the given schema type.
 * @param {Array} enumTypes An array of enum types that may be referenced by the given schema type.
 */
export function createJsonSchemaForSchemaTypeArray (schemaType, schemaTypes, enumTypes) {
  check.assert.object(schemaType)
  check.assert.string(schemaType.name)
  check.assert.array.of.object(schemaTypes)
  check.assert.array.of.object(enumTypes)

  return {
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Array of Schema Type "${schemaType.name}"`,
    type: 'array',
    items: {
      ...createJsonSchemaFragmentForSchemaType(schemaType)
    },
    definitions: createJsonSchemaDefinitionsSection(schemaType.referencedSchemaTypes, schemaType.referencedEnumTypes, schemaTypes, enumTypes)
  }
}
