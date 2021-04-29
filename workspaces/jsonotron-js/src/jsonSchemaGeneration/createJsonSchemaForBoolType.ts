import { AnySchema } from 'ajv'
import { JsonotronType } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON schema for the given bool type.
 * @param domain The domain for the $id of the schema.
 * @param boolType A bool scalar type.
 */
export function createJsonSchemaForBoolType (domain: string, boolType: JsonotronType): AnySchema {
  return {
    $id: `${domain}/${boolType.system}/${boolType.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Boolean Type "${boolType.name}"`,
    type: 'boolean'
  }
}
