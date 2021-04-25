import { JsonotronType } from './JsonotronType'

/**
 * Represents a float.
 */
export interface FloatType extends JsonotronType {
  /**
   * Specifies the minimum value of the float.
   */
  minimum: number

  /**
   * Specifies whether the minimum value should be treated as an exclusive value.
   */
  isMinimumExclusive?: boolean

  /**
   * Specifies the maximum value of the float.
   */
  maximum: number

  /**
   * Specifies whether the maximum value should be treated as an exclusive value.
   */
  isMaximumExclusive?: boolean
}
