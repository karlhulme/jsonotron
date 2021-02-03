/**
 * Represents an object type in the GraphQL system.
 */
export interface TypeMapObject {
  /**
   * The name of a type.
   */
  name: string

  /**
   * The documentation associated with the type.
   */
  documentation: string

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
 * Represents the property of a GraphQL object type.
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
