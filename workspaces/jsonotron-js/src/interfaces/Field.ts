/**
 * Defines the requirements of a field within a structure.
 */
export interface Field {
  /**
   * The type of the field.
   */
  type: string

  /**
   * True if the field is expected to be an array.
   */
  isArray?: boolean

  /**
   * True if the field must be supplied.
   */
  isRequired?: boolean

  /**
   * True if a null can be supplied instead of a valid value.
   */
  isNullable?: boolean
}
