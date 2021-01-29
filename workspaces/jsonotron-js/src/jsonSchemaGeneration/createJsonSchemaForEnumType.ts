import { EnumType } from '../interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON Schema for the given enum type.
 * @param enumType An enum type.
 */
export function createJsonSchemaForEnumType (enumType: EnumType): Record<string, unknown> {
  return {
    $id: `${enumType.domain}/${enumType.system}/${enumType.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Enum Type "${enumType.name}"`,
    enum: enumType.items.map(item => item.value)
  }
}
