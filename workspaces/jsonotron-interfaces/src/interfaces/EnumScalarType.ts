import { EnumScalarTypeItem } from './EnumScalarTypeItem'
import { JsonotronType } from './JsonotronType'

/**
 * Represents an enumeration.
 */
export interface EnumScalarType extends JsonotronType {
  /**
   * An array of items that make up this enumeration.
   */
  items: EnumScalarTypeItem[]

  /**
   * The type that describes the shape of the data
   * associated with each enumeration item.  This should be a
   * record to make it easier to adapt and extend over time.
   */
  dataType?: string
}
