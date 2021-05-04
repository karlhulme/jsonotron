/**
 * Raised if a record type variant refers to a property not found on the record type.
 */
 export class UnrecognisedPropertyNameOnRecordTypeVariantError extends Error {
  recordTypeName: string
  variantName: string
  propertyName: string

  /**
   * Constructs a new instance.
   * @param recordTypeName The name of a record type.
   * @param variantName The name of a variant.
   * @param propertyName The property name that was not recognised.
   */
  constructor (recordTypeName: string, variantName: string, propertyName: string) {
    super(`Variant ${variantName} of record type ${recordTypeName} references unrecognised property named ${propertyName}.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.recordTypeName = recordTypeName
    this.variantName = variantName
    this.propertyName = propertyName
  }
}
