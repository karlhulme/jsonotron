import { EnumTypeItem } from './EnumTypeItem'
import { JsonotronBaseType } from './JsonotronBaseType'

/**
 * Represents an enumerated type.
 */
export interface EnumType extends JsonotronBaseType {
  /**
   * The documentation for the enum type.
   */
  documentation: string

  /**
   * A JSON schema for data attached to each item.
   */
  dataJsonSchema?: Record<string, unknown>

  /**
   * An array of items.
   */
  items: EnumTypeItem[]
}
