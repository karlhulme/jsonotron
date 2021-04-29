import { EnumTypeItem } from './EnumTypeItem'
import { JsonotronType } from './JsonotronType'

/**
 * Represents an enumeration.
 */
export interface EnumType extends JsonotronType {
  /**
   * An array of items that make up this enumeration.
   */
  items: EnumTypeItem[]

  /**
   * The type that describes the shape of the data
   * associated with each enumeration item.  This should be a
   * record to make it easier to adapt and extend over time.
   */
  dataType?: string
}
