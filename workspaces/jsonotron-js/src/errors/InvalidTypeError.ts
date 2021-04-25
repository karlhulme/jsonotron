/**
 * Raised if a type is not valid.
 */
 export class InvalidTypeError extends Error {
  typeName: string
  typeKind: string
  details: string

  /**
   * Constructs a new instance.
   * @param typeName The name of a type.
   * @param typeKind The kind of a type.
   * @param details The details of the error.
   */
  constructor (typeName: string, typeKind: string, details: string) {
    super(`Type ${typeName} is not a valid ${typeKind}.\n${details}`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.typeName = typeName
    this.typeKind = typeKind
    this.details = details
  }
}
