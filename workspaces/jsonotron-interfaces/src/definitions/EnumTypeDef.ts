import { EnumTypeDefItem } from './EnumTypeDefItem'
import { JsonotronTypeDef } from './JsonotronTypeDef'

/**
 * Represents an enumeration definition.
 */
export interface EnumTypeDef extends JsonotronTypeDef {
  /**
   * An array of items that make up this enumeration.
   */
  items: EnumTypeDefItem[]

  /**
   * If populated, this type describes the shape of the data
   * associated with each enumeration item.  This should be a
   * record to make it easier to adapt and extend over time.
   */
  dataType?: string
}
