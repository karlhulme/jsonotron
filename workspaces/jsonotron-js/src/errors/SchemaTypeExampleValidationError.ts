/**
 * Raised if a schema type example fails validation.
 */
export class SchemaTypeExampleValidationError extends Error {
  schemaTypeName: string
  exampleIndex: number
  details: string

  /**
   * Constructs a new instance.
   * @param schemaTypeName The name of a schema type.
   * @param exampleIndex The index of the example.
   * @param details The details of the error.
   */
  constructor (schemaTypeName: string, exampleIndex: number, details: string) {
    super(`Example ${exampleIndex} of Schema type ${schemaTypeName} failed to validate.\n${details}`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.schemaTypeName = schemaTypeName
    this.exampleIndex = exampleIndex
    this.details = details
  }
}
