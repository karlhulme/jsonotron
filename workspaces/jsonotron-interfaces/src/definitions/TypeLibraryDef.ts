import { EnumTypeDef } from './EnumTypeDef'
import { FloatTypeDef } from './FloatTypeDef'
import { IntTypeDef } from './IntTypeDef'
import { JsonotronTypeDef } from './JsonotronTypeDef'
import { RecordTypeDef } from './RecordTypeDef'
import { StringTypeDef } from './StringTypeDef'

/**
 * The result of parsing a set of resources.
 * A type library may contain type definitions from multiple type systems.
 */
export interface TypeLibraryDef {
  /**
   * An array of verified bool type definitions.
   */
  boolTypeDefs: JsonotronTypeDef[]

  /**
   * An array of verified enum type definitions.
   */
  enumTypeDefs: EnumTypeDef[]

  /**
   * An array of verified float type definitions.
   */
  floatTypeDefs: FloatTypeDef[]

  /**
   * An array of verified int type definitions.
   */
  intTypeDefs: IntTypeDef[]

  /**
   * An array of verified object type definitions.
   */
  objectTypeDefs: JsonotronTypeDef[]

  /**
   * An array of verified record type definitions.
   */
  recordTypeDefs: RecordTypeDef[]

  /**
   * An array of verified string type definitions.
   */
  stringTypeDefs: StringTypeDef[]
}
