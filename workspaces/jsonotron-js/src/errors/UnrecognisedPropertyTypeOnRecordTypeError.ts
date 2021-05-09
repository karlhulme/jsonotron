/**
 * Raised if an unrecognised type is specified for a property of a record type.
 */
export class UnrecognisedPropertyTypeOnRecordTypeError extends Error {
  recordTypeName: string
  propertyName: string
  propertyType: string

  /**
   * Constructs a new instance.
   * @param recordTypeName The name of a record type.
   * @param propertyName The name of a property on the record.
   * @param propertyType The type of a property that was not recognised.
   */
  constructor (recordTypeName: string, propertyName: string, propertyType: string) {
    super(`Record type ${recordTypeName} defines ${propertyName} property with unknown type ${propertyType}.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.recordTypeName = recordTypeName
    this.propertyName = propertyName
    this.propertyType = propertyType
  }
}
