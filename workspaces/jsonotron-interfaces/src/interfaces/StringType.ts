import { JsonotronType } from './JsonotronType'
import { TestCase } from './TestCase'

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
   */
  validTestCases?: TestCase<string>[]

  /**
  * An array of values that cannot be represented by this type. 
  */
  invalidTestCases?: TestCase<string>[]
}
