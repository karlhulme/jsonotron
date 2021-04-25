import { AnySchema } from 'ajv'
import { EnumType } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON schema for the given enum scalar type.
 * @param domain The domain for the $id of the schema.
 * @param enumType An enum scalar type.
 */
export function createJsonSchemaForEnumScalarType (domain: string, enumType: EnumType): AnySchema {
  return {
    $id: `${domain}/${enumType.system}/${enumType.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Enum Type "${enumType.name}"`,
    enum: enumType.items.map(item => item.value)
  }
}
