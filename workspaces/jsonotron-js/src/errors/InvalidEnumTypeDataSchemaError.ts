/**
 * Raised if an enum type defines an invalid data json schema.
 */
 export class InvalidEnumTypeDataSchemaError extends Error {
  enumTypeName: string
  details: string

  /**
   * Constructs a new instance.
   * @param enumTypeName The name of an enum type.
   * @param details The details of the error.
   */
  constructor (enumTypeName: string, details: string) {
    super(`Data schema for enum type ${enumTypeName} failed to validate.\n${details}`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.enumTypeName = enumTypeName
    this.details = details
  }
}
