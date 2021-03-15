import { StructureValidationResult } from 'jsonotron-interfaces'

/**
 * Raised if an object fails validation with respect to a structure.
 */
 export class StructureValidationError extends Error {
  structureName: string
  validationResult: StructureValidationResult

  /**
   * Constructs a new instance.
   * @param structureName The name of a structure.
   * @param validationResult The result of the validation.
   */
  constructor (structureName: string, validationResult: StructureValidationResult) {
    super(`Validation failed against structure ${structureName}.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.structureName = structureName
    this.validationResult = validationResult
  }
}
