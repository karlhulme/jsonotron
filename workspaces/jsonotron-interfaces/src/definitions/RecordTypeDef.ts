import { JsonotronTypeDef } from './JsonotronTypeDef'
import { RecordTypeDefProperty } from './RecordTypeDefProperty'
import { RecordTypeDefVariant } from './RecordTypeDefVariant'
import { TestCase } from './TestCase'

/**
 * Represents a record type definition.
 */
export interface RecordTypeDef extends JsonotronTypeDef {
  /**
   * An array of properties that can appear in this record.
   */
  properties: RecordTypeDefProperty[]

  /**
   * An array of types that are derived by selecting or excluding 
   * specific properties of the type.
   */
  variants?: RecordTypeDefVariant[]

  /**
   * An array of values that can be represented by this type.
   * Some of these cases may also serve as example usages of the type.
   */
  validTestCases: TestCase<unknown>[]

  /**
   * An array of values that cannot be represented by this type. 
   */
  invalidTestCases?: TestCase<unknown>[]
}
