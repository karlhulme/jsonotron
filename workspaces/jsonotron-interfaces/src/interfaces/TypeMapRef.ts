/**
 * Represents a reference from one type to another type.
 */
export interface TypeMapRef {
  /**
   * The domain of the owning type system.
   */
  domain: string

  /**
   * The name of the type system.
   */
  system: string
 
  /**
   * The short name of the type.
   */
  name: string

  /**
   * The domain and system qualified name of a type.  This may reference
   * an enum type, a schema type, or a sub-object of a schema type.
   */
  fullyQualifiedName: string

  /**
   * The name of another type.
   * If this field is a scalar ref (isScalarRef=true) then this will be
   * the name of json schema type, otherwise it will be a fully qualified name.
   */
  refTypeName: string

  /**
   * True if the refTypeName refers to an json schema scalar.
   */
  isScalarRef: boolean

  /**
   * True if the refTypeName refers to an enum schema type.
   */
  isEnumRef: boolean

  /**
   * The number of array wrappers around the referenced type.
   */
  refTypeArrayCount: number
}
