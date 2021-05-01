/**
 * Raised if a record type variant does not specify an include or exclude list.
 */
 export class RecordTypeVariantMissingPropertyArrayError extends Error {
  recordTypeName: string
  variantName: string

  /**
   * Constructs a new instance.
   * @param recordTypeName The name of a record type.
   * @param variantName The name of a variant.
   */
  constructor (recordTypeName: string, variantName: string) {
    super(`Variant ${variantName} of record type ${recordTypeName} does not provide an includeProperties or excludeProperties array.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.recordTypeName = recordTypeName
    this.variantName = variantName
  }
}
