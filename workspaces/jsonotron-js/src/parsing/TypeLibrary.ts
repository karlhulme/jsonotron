import {
  ArrayType, EnumScalarType, FloatScalarType,
  IntScalarType, JsonotronType, RecordType,
  StringScalarType
} from 'jsonotron-interfaces'

/**
 * The result of parsing a set of resources.
 * A type library may contain types from multiple type systems.
 */
export interface TypeLibrary {
  /**
   * An array of verified array types.
   */
  arrayTypes: ArrayType[]

  /**
   * An array of verified bool scalar types.
   */
  boolScalarTypes: JsonotronType[]

  /**
   * An array of verified enum scalar types.
   */
  enumScalarTypes: EnumScalarType[]

  /**
   * An array of verified float scalar types.
   */
  floatScalarTypes: FloatScalarType[]

  /**
   * An array of verified int scalar types.
   */
  intScalarTypes: IntScalarType[]

  /**
   * An array of verified object types.
   */
  objectTypes: JsonotronType[]

  /**
   * An array of verified record types.
   */
  recordTypes: RecordType[]

  /**
   * An array of verified string scalar types.
   */
  stringScalarTypes: StringScalarType[]
}
