import { AnySchema } from 'ajv'
import { JsonotronTypeDef } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON schema for the given bool type.
 * @param domain The domain for the $id of the schema.
 * @param boolTypeDef A bool scalar type.
 */
export function createJsonSchemaForBoolTypeDef (domain: string, boolTypeDef: JsonotronTypeDef): AnySchema {
  return {
    $id: `${domain}/${boolTypeDef.system}/${boolTypeDef.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Boolean Type: ${boolTypeDef.name}`,
    type: 'boolean'
  }
}
