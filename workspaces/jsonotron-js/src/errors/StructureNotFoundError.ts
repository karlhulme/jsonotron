/**
 * Raised if a structure cannot be found.
 */
 export class StructureNotFoundError extends Error {
  structureName: string

  /**
   * Constructs a new instance.
   * @param structureName The name of a structure.
   */
  constructor (structureName: string) {
    super(`Structure name ${structureName} is not recognised.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.structureName = structureName
  }
}
