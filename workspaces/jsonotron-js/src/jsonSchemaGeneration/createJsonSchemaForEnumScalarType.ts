import { AnySchema } from 'ajv'
import { EnumScalarType } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON schema for the given enum scalar type.
 * @param domain The domain for the $id of the schema.
 * @param enumScalarType An enum scalar type.
 */
export function createJsonSchemaForEnumScalarType (domain: string, enumScalarType: EnumScalarType): AnySchema {
  return {
    $id: `${domain}/${enumScalarType.system}/${enumScalarType.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Enum Scalar Type "${enumScalarType.name}"`,
    enum: enumScalarType.items.map(item => item.value)
  }
}
