/**
 * Raised if a type name is not recognised.
 */
export class UnrecognisedTypeNameError extends Error {
  /**
   * Constructs a new instance.
   * @param typeName The unrecognised type name.
   */
  constructor (readonly typeName: string) {
    super(`Type '${typeName}' could not be unambiguously resolved to a recognised type.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.typeName = typeName
  }
}
