/**
 * Raised if a schema type is not valid.
 */
export class InvalidSchemaTypeError extends Error {
  schemaTypeName: string
  details: string

  /**
   * Constructs a new instance.
   * @param schemaTypeName The name of a schema type.
   * @param details The details of the error.
   */
  constructor (schemaTypeName: string, details: string) {
    super(`Schema type ${schemaTypeName} is not valid.\n${details}`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.schemaTypeName = schemaTypeName
    this.details = details
  }
}
