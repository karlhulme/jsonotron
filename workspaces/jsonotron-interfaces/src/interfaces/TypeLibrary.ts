import { EnumType } from './EnumType'
import { FloatType } from './FloatType'
import { IntType } from './IntType'
import { JsonotronType } from './JsonotronType'
import { RecordType } from './RecordType'
import { StringType } from './StringType'

/**
 * The result of parsing a set of resources.
 * A type library may contain types from multiple type systems.
 */
export interface TypeLibrary {
  /**
   * An array of verified bool types.
   */
  boolTypes: JsonotronType[]

  /**
   * An array of verified enum types.
   */
  enumTypes: EnumType[]

  /**
   * An array of verified float types.
   */
  floatTypes: FloatType[]

  /**
   * An array of verified int types.
   */
  intTypes: IntType[]

  /**
   * An array of verified object types.
   */
  objectTypes: JsonotronType[]

  /**
   * An array of verified record types.
   */
  recordTypes: RecordType[]

  /**
   * An array of verified string types.
   */
  stringTypes: StringType[]
}
