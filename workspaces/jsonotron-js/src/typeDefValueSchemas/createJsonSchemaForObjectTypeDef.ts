import { AnySchema } from 'ajv'
import { JsonotronTypeDef } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON schema for the given object type.
 * @param domain The domain for the $id of the schema.
 * @param objectTypeDef An object type.
 */
export function createJsonSchemaForObjectTypeDef (domain: string, objectTypeDef: JsonotronTypeDef): AnySchema {
  return {
    $id: `${domain}/${objectTypeDef.system}/${objectTypeDef.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Object Type: ${objectTypeDef.name}`,
    type: 'object',
    additionalProperties: true
  }
}
