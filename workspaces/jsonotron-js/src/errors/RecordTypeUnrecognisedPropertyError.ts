/**
 * Raised if a record type refers to a property not found in the properties list.
 */
 export class RecordTypeUnrecognisedPropertyError extends Error {
  recordTypeName: string
  propertyName: string

  /**
   * Constructs a new instance.
   * @param recordTypeName The name of a record type.
   * @param propertyName The property name that was not recognised.
   */
  constructor (recordTypeName: string, propertyName: string) {
    super(`Record type ${recordTypeName} references unrecognised property named ${propertyName}.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.recordTypeName = recordTypeName
    this.propertyName = propertyName
  }
}
