/**
 * Represents an item in an enumeration of a TypeMapRef.
 */
 export interface TypeMapRefEnumItem {
  /**
   * The underlying value of the item.
   */
  value: string

  /**
   * The display text of the value in English.
   */
  text: string

  /**
   * If populated, this value explains why the value was deprecated
   * and/or which item to use instead. 
   */
  deprecated?: string

  /**
   * A symbol associated with the item.
   */
  symbol?: string

  /**
   * Additional data associated with the enum type item.
   */
  data?: Record<string, unknown>

  /**
   * The documentation for the enum type item.
   */
  documentation?: string
}
