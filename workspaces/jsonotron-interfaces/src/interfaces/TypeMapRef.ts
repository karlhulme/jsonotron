/**
 * Represents a reference from one type to another type.
 */
export interface TypeMapRef {
  /**
   * The name of a type.
   */
  name: string

  /**
   * The name of another type.
   */
  refTypeName: string

  /**
   * True if the refTypeName refers to a json-schema scalar.
   */
  isScalarRef: boolean

  /**
   * The number of array wrappers around the referenced type.
   */
  refTypeArrayCount: number
}
