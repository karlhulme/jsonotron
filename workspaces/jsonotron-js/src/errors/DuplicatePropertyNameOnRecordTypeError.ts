/**
 * Raised if a record type contains multiple properties with the same name.
 */
 export class DuplicatePropertyNameOnRecordTypeError extends Error {
  recordTypeName: string
  propertyName: string

  /**
   * Constructs a new instance.
   * @param recordTypeName The name of a record type.
   * @param propertyName The property name that was used multiple times.
   */
  constructor (recordTypeName: string, propertyName: string) {
    super(`Record type ${recordTypeName} declares property named ${propertyName} multiple times.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.recordTypeName = recordTypeName
    this.propertyName = propertyName
  }
}
