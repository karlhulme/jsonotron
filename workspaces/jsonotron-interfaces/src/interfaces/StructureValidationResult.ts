import { StructureValidationResultField } from './StructureValidationResultField'

/**
 * Represents the result of validating a field or field block.
 */
export interface StructureValidationResult {
  /**
   * True if all the fields were validated successfully
   */
  validated: boolean

  /**
   * An array of fields that failed validation.
   */
  fields: StructureValidationResultField[]
}
