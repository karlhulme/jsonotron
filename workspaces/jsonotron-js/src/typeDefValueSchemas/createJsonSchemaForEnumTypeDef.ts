import { AnySchema } from 'ajv'
import { EnumTypeDef } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON schema for the given enum scalar type.
 * @param domain The domain for the $id of the schema.
 * @param enumTypeDef An enum scalar type.
 */
export function createJsonSchemaForEnumTypeDef (domain: string, enumTypeDef: EnumTypeDef): AnySchema {
  return {
    $id: `${domain}/${enumTypeDef.system}/${enumTypeDef.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Enum Type: ${enumTypeDef.name}`,
    enum: enumTypeDef.items.map(item => item.value)
  }
}
