/**
 * Raised if an unrecognised type is encountered.
 */
 export class UnrecognisedTypeError extends Error {
  typeName: string

  /**
   * Constructs a new instance.
   * @param typeName The name of a type.
   */
  constructor (typeName: string) {
    super(`Type ${typeName} is not recognised.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.typeName = typeName
  }
}
