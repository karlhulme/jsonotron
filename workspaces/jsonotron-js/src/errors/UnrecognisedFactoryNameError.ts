/**
 * Raised if a record references an unknown factory.
 */
 export class UnrecognisedFactoryNameError extends Error {
  factoryName: string
  recordTypeName: string

  /**
   * Constructs a new instance.
   * @param factoryName The name of a record factory.
   * @param recordTypeName The name of the record that references the factory.
   */
  constructor (factoryName: string, recordTypeName: string) {
    super(`Record '${recordTypeName}' refers to unknown factory '${factoryName}'.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.factoryName = factoryName
    this.recordTypeName = recordTypeName
  }
}
