import { EnumType } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON schema for the given enum type.
 * @param domain The domain for the $id of the schema.
 * @param enumType An enum type.
 */
export function createJsonSchemaForEnumType (domain: string, enumType: EnumType): Record<string, unknown> {
  return {
    $id: `${domain}/${enumType.system}/${enumType.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Enum Type "${enumType.name}"`,
    enum: enumType.items.map(item => item.value)
  }
}
