/**
 * Raised if a value is provided that fails validation against it's type.
 */
 export class ValueValidationError extends Error {
  typeName: string
  value: unknown
  details: string

  /**
   * Constructs a new instance.
   * @param typeName The name of the type used for validation.
   * @param value Any value.
   * @param details The details of the error.
   */
  constructor (typeName: string, value: unknown, details: string) {
    super(`Value was not valid for type ${typeName}.\n${JSON.stringify(value, null, 2)}\n${details}`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.typeName = typeName
    this.value = value
    this.details = details
  }
}
