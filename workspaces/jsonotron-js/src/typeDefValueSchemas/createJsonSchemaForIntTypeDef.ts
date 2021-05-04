import { AnySchema } from 'ajv'
import { IntTypeDef } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON schema for the given int scalar type.
 * @param domain The domain for the $id of the schema.
 * @param intTypeDef An int scalar type.
 */
export function createJsonSchemaForIntTypeDef (domain: string, intTypeDef: IntTypeDef): AnySchema {
  return {
    $id: `${domain}/${intTypeDef.system}/${intTypeDef.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Int Type: ${intTypeDef.name}`,
    type: 'integer',
    minimum: intTypeDef.minimum,
    maximum: intTypeDef.maximum
  }
}
