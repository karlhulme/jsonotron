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
   * The domain used for JSON schema generation.
   */
  jsonSchemaDomain: string

  /**
   * An array of bool types ready for code generation.
   */
  boolTypes: JsonotronType[]

  /**
   * An array of enum types ready for code generation.
   */
  enumTypes: EnumType[]

  /**
   * An array of float types ready for code generation.
   */
  floatTypes: FloatType[]

  /**
   * An array of int types ready for code generation.
   */
  intTypes: IntType[]

  /**
   * An array of object types ready for code generation.
   */
  objectTypes: JsonotronType[]

  /**
   * An array of record types ready for code generation.
   */
  recordTypes: RecordType[]

  /**
   * An array of string types ready for code generation.
   */
  stringTypes: StringType[]
}
