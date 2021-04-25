/**
 * Raised if an enum type item has a data object that fails validation.
 */
 export class EnumScalarTypeItemDataValidationError extends Error {
  enumTypeName: string
  itemValue: string
  details: string

  /**
   * Constructs a new instance.
   * @param enumTypeName The name of an enum type.
   * @param itemValue A value from the enum type.
   * @param details The details of the error.
   */
  constructor (enumTypeName: string, itemValue: string, details: string) {
    super(`Data for item ${itemValue} of enum type ${enumTypeName} failed to validate.\n${details}`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.enumTypeName = enumTypeName
    this.itemValue = itemValue
    this.details = details
  }
}
