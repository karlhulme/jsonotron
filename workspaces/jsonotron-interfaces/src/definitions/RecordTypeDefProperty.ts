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
   * The fully qualified type of the property.
   */
  propertyType: string

  /**
   * Specifies if the value is to be treated as an array.
   */
  isArray?: boolean

  /**
   * Specifies if this property is required and must be specified.
   */
  isRequired?: boolean

  /**
   * If populated, this value explains why the property was deprecated
   * and/or which property to use instead.
   */
  deprecated?: string
}
