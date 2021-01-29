import { SchemaType } from '../interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'
import clone from 'clone-deep'

/**
 * Creates a JSON Schema for an array of the given schema type.
 * @param schemaType A schema type.
 */
export function createJsonSchemaForSchemaTypeArray (schemaType: SchemaType): Record<string, unknown> {
  return {
    $id: `${schemaType.domain}/${schemaType.system}/${schemaType.name}/array`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Schema Type "${schemaType.name}" Array`,
    type: 'array',
    items: {
      ...clone<Record<string, unknown>>(schemaType.jsonSchema as Record<string, unknown>)
    }
  }
}
