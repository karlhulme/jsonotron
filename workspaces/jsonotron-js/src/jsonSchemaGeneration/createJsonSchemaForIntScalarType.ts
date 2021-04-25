import { AnySchema } from 'ajv'
import { IntScalarType } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON schema for the given int scalar type.
 * @param domain The domain for the $id of the schema.
 * @param intScalarType An int scalar type.
 */
export function createJsonSchemaForIntScalarType (domain: string, intScalarType: IntScalarType): AnySchema {
  return {
    $id: `${domain}/${intScalarType.system}/${intScalarType.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Int Scalar Type "${intScalarType.name}"`,
    type: 'integer',
    minimum: intScalarType.minimum,
    maximum: intScalarType.maximum
  }
}
