/**
 * Represents the result of validating a field or field block.
 */
export interface ValueValidationResult {
  /**
   * True if the type was resolved to an enum or schema definition
   * and validation took place.
   */
  resolved: boolean

  /**
   * True if the value was a valid representation of the type
   * described by the field block definition.
   */
  validated: boolean

  /**
   * A formatted description of the problem.
   */
  message?: string
}
