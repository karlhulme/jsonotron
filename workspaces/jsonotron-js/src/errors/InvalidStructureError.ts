/**
 * Raised if a structure is not valid.
 */
 export class InvalidStructureError extends Error {
  structureName: string
  details: string

  /**
   * Constructs a new instance.
   * @param structureName The name of a structure.
   * @param details The details of the error.
   */
  constructor (structureName: string, details: string) {
    super(`Structure ${structureName} is not valid.\n${details}`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.structureName = structureName
    this.details = details
  }
}
