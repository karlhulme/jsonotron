/**
 * Describes a property of a record type.
 */
export interface RecordTypeProperty {
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


  /**
   * The properties defined below are set by the parsing process.
   */


  /**
   * The system part of the property type.
   */
  propertyTypeSystem: string

  /**
   * The short name of the property type.
   */
  propertyTypeName: string

  /**
   * Indicates if this property is optional.
   */
  isOptional?: boolean

  /**
   * Indicates if this property is a boolean.
   */
  isBool?: boolean

  /**
   * Indicates if this property is an enumeration.
   */
  isEnum?: boolean

  /**
   * Indicates if this property is a float.
   */
  isFloat?: boolean

  /**
   * Indicates if this property is an integer.
   */
  isInt?: boolean

  /**
   * Indicates if this property is an object.
   */
  isObject?: boolean

  /**
   * Indicates if this property is a record.
   */
  isRecord?: boolean

  /**
   * Indicates if this property is a string.
   */
  isString?: boolean
}
