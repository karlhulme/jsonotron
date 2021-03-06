import { SchemaType } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'
import clone from 'clone-deep'

/**
 * Creates a JSON Schema for the given schema type.
 * @param schemaType A schema type.
 */
export function createJsonSchemaForSchemaType (schemaType: SchemaType): Record<string, unknown> {
  return {
    $id: `${schemaType.domain}/${schemaType.system}/${schemaType.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Schema Type "${schemaType.name}"`,
    ...clone<Record<string, unknown>>(schemaType.jsonSchema as Record<string, unknown>)
  }
}
