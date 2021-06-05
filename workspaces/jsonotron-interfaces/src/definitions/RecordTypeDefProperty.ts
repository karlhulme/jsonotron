/**
 * Describes a property of a record type definition
 */
export interface RecordTypeDefProperty {
  /**
   * The name of the property.
   */
  name: string

  /**
   * A description of how this property is to be used.
   */
  summary: string

  /**
   * The type of the property.
   */
  propertyType: string

  /**
   * The only acceptable value of the property.
   */
  constant?: string

  /**
   * Specifies if the property is to be treated as an array.
   */
  isArray?: boolean

  /**
   * If populated, this value explains why the property was deprecated
   * and/or which property to use instead.
   */
  deprecated?: string
}
