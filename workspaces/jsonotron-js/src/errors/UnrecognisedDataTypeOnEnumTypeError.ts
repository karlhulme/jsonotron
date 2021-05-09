/**
 * Raised if an unrecognised type is specified for an enum data type.
 */
 export class UnrecognisedDataTypeOnEnumTypeError extends Error {
  enumTypeName: string
  dataTypeName: string

  /**
   * Constructs a new instance.
   * @param enumTypeName The name of an enum type.
   * @param dataTypeName The value of the dataType property.
   */
  constructor (enumTypeName: string, dataTypeName: string) {
    super(`Enum type ${enumTypeName} specifies unknown data type of ${dataTypeName}.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.enumTypeName = enumTypeName
    this.dataTypeName = dataTypeName
  }
}
