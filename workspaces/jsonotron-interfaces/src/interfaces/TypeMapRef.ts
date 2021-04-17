import { TypeMapRefEnumItem } from './TypeMapRefEnumItem'

/**
 * Represents a reference from one type to another type.
 */
export interface TypeMapRef {
  /**
   * The name of the type system.
   */
  system: string
 
  /**
   * The short name of the type.
   */
  name: string

  /**
   * The name of another type.
   * If this field is a scalar ref (isScalarRef=true) then this will be
   * the name of a json schema type such as 'string' or 'boolean'.
   * If this field is an enum ref (isEnumRef=true) then this will 'string'.
   * In all other cases it will be a fully qualified name.
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
   * If the scalar is an enum (isEnumRef=true) then this value will
   * hold all of the valid values of the enum.
   */
  enumItems?: TypeMapRefEnumItem[]

  /**
   * If the scalar is an enum (isEnumRef=true) and that enum defines
   * a dataJsonSchema then this value will hold the name of the object
   * type that defines the shape of the meta-data associated with each 
   * of the enum values.
   * 
   */
  enumItemDataTypeName?: string

  /**
   * The number of array wrappers around the referenced type.
   */
  refTypeArrayCount: number
}
