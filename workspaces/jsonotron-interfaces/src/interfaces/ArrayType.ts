import { JsonotronType } from './JsonotronType'

/**
 * Represents an array type.
 */
export interface ArrayType extends JsonotronType {
  /**
   * The type of each element in the array.
   */
  elementType: string

  /**
   * Specifies the minimum length of the array.
   */
  minimumLength?: number

  /**
   * Specifies the maximum length of the array.
   */
  maximumLength?: number
}
