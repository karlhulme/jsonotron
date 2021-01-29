/**
 * Raised if an enum type is not valid.
 */
export class InvalidEnumTypeError extends Error {
  enumTypeName: string
  details: string

  /**
   * Constructs a new instance.
   * @param enumTypeName The name of an enum type.
   * @param details The details of the error.
   */
  constructor (enumTypeName: string, details: string) {
    super(`Enum type ${enumTypeName} is not valid.\n${details}`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.enumTypeName = enumTypeName
    this.details = details
  }
}
