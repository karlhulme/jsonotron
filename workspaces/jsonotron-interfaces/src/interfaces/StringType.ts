import { JsonotronType } from './JsonotronType'
import { StringTypeValidTestCase } from './StringTypeValidTestCase'

/**
 * Represents a string.
 */
export interface StringType extends JsonotronType {
  /**
   * Specifies the regular expression string that can be used
   * to validate the string.
   */
  regex?: string;

  /**
   * Specifies the minimum length of the string.
   */
  minimumLength?: number

  /**
   * Specifies the maximum length of the string.
   */
  maximumLength: number

  /**
   * An array of values that can be represented by this type.
   * Some of these cases may also serve as example usages of the type.
   */
  validTestCases?: StringTypeValidTestCase[]

  /**
  * An array of values that cannot be represented by this type. 
  */
  invalidTestCases?: string[]
}
