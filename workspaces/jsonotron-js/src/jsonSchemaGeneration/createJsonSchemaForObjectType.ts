import { AnySchema } from 'ajv'
import { JsonotronType } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON schema for the given object type.
 * @param domain The domain for the $id of the schema.
 * @param objectType An object type.
 */
export function createJsonSchemaForObjectType (domain: string, objectType: JsonotronType): AnySchema {
  return {
    $id: `${domain}/${objectType.system}/${objectType.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Object Type "${objectType.name}"`,
    type: 'object',
    additionalProperties: true
  }
}
