/**
 * Raised if a schema type test case passes validation when it
 * was expected to fail.
 */
export class SchemaTypeTestCaseInvalidationError extends Error {
  schemaTypeName: string
  testCaseIndex: number

  /**
   * Constructs a new instance.
   * @param schemaTypeName The name of a schema type.
   * @param testCaseIndex The index of the invalid test case.
   */
  constructor (schemaTypeName: string, testCaseIndex: number) {
    super(`Invalid test case ${testCaseIndex} of Schema type ${schemaTypeName} passed validation but it was expected to fail.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.schemaTypeName = schemaTypeName
    this.testCaseIndex = testCaseIndex
  }
}
