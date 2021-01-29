import { EnumType } from '../interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON Schema for an array of the given enum type.
 * @param enumType An enum type.
 */
export function createJsonSchemaForEnumTypeArray (enumType: EnumType): Record<string, unknown> {
  return {
    $id: `${enumType.domain}/${enumType.system}/${enumType.name}/array`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Enum Type "${enumType.name}" Array`,
    type: 'array',
    items: {
      enum: enumType.items.map(item => item.value)
    }
  }
}
