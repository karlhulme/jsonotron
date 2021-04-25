import { AnySchema } from 'ajv'
import { JsonotronType } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON schema for the given bool type.
 * @param domain The domain for the $id of the schema.
 * @param boolScalarType A bool scalar type.
 */
export function createJsonSchemaForBoolScalarType (domain: string, boolScalarType: JsonotronType): AnySchema {
  return {
    $id: `${domain}/${boolScalarType.system}/${boolScalarType.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Boolean Scalar Type "${boolScalarType.name}"`,
    type: 'boolean'
  }
}
