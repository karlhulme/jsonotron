import { SchemaType } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON schema for the given schema type.
 * @param domain The domain for the $id of the schema.
 * @param schemaType A schema type.
 */
export function createJsonSchemaForSchemaType (domain: string, schemaType: SchemaType): Record<string, unknown> {
  return {
    $id: `${domain}/${schemaType.system}/${schemaType.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Schema Type "${schemaType.name}"`,
    ...schemaType.jsonSchema
  }
}
