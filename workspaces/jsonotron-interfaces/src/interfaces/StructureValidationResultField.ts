/**
 * Represents a field within a structure that failed validation.
 */
export interface StructureValidationResultField {
  /**
   * The name of a field.
   */
  name: string

  /**
   * A formatted description of the problem.
   */
  message: string
}
