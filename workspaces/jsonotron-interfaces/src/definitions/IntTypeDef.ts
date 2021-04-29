import { JsonotronTypeDef } from './JsonotronTypeDef'

/**
 * Represents an integer definition.
 */
export interface IntTypeDef extends JsonotronTypeDef {
  /**
   * Specifies the minimum value of the integer.
   */
  minimum: number

  /**
   * Specifies the maximum value of the integer.
   */
  maximum: number
}
