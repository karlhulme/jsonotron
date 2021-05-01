import { Example } from './Example'
import { JsonotronType } from './JsonotronType'

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
   * An array of examples.
   */
  examples: Example<string>[]
}
