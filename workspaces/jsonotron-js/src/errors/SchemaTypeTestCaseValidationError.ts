/**
 * Raised if a schema type test case fails validation.
 */
export class SchemaTypeTestCaseValidationError extends Error {
  schemaTypeName: string
  testCaseIndex: number
  details: string

  /**
   * Constructs a new instance.
   * @param schemaTypeName The name of a schema type.
   * @param testCaseIndex The index of the valid test case.
   * @param details The details of the error.
   */
  constructor (schemaTypeName: string, testCaseIndex: number, details: string) {
    super(`Valid test case ${testCaseIndex} of Schema type ${schemaTypeName} failed to validate.\n${details}`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.schemaTypeName = schemaTypeName
    this.testCaseIndex = testCaseIndex
    this.details = details
  }
}
