import { JsonotronType } from './JsonotronType'
import { RecordTypeProperty } from './RecordTypeProperty'
import { RecordTypeValidTestCase } from './RecordTypeValidTestCase'
import { RecordTypeVariant } from './RecordTypeVariant'

export interface RecordType extends JsonotronType {
  /**
   * An array of properties that can appear in this record.
   */
  properties: RecordTypeProperty[]

  /**
   * An array of types that are derived by selecting or excluding 
   * specific properties of the type.
   */
  variants?: RecordTypeVariant[]

  /**
   * An array of values that can be represented by this type.
   * Some of these cases may also serve as example usages of the type.
   */
  validTestCases: RecordTypeValidTestCase[]

  /**
   * An array of values that cannot be represented by this type. 
   */
  invalidTestCases?: unknown[]
}
