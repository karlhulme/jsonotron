/**
 * Represents an object, that contains properties of its own, in a type map.
 */
export interface TypeMapObject {
  /**
   * The name of the type system.
   */
  system: string

  /**
   * The short name of the type.
   */
  name: string

  /**
   * The documentation associated with the type.
   */
  documentation: string

  /**
   * Indicates if this object was originally defined by a schema type.
   * If this value is false, then the object type was generated as a child
   * of a schema type.
   */
  rootType: boolean
  
  /**
   * The properties of the object.
   */
  properties: TypeMapObjectProperty[]

  /**
   * The number of array wrappers around the object type.
   */
  objectTypeArrayCount: number
}

/**
 * Represents a property of an object in a type map.
 */
export interface TypeMapObjectProperty {
  /**
   * The name of the property.
   */
  propertyName: string

  /**
   * The documentation associated with the property.
   */
  documentation: string

  /**
   * The type of the property.
   */
  refTypeName: string

  /**
   * True if the property must be present on the parent type.
   */
  isRequired: boolean
}
