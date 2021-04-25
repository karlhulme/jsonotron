import { AnySchema } from 'ajv'
import { IntType } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON schema for the given int scalar type.
 * @param domain The domain for the $id of the schema.
 * @param intType An int scalar type.
 */
export function createJsonSchemaForIntScalarType (domain: string, intType: IntType): AnySchema {
  return {
    $id: `${domain}/${intType.system}/${intType.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Int Type "${intType.name}"`,
    type: 'integer',
    minimum: intType.minimum,
    maximum: intType.maximum
  }
}
