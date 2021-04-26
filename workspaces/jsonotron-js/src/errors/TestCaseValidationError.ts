/**
 * Raised if a type test case fails validation.
 */
export class TestCaseValidationError extends Error {
  typeName: string
  testCaseIndex: number
  details: string

  /**
   * Constructs a new instance.
   * @param typeName The name of a type.
   * @param testCaseIndex The index of the valid test case.
   * @param details The details of the error.
   */
  constructor (typeName: string, testCaseIndex: number, details: string) {
    super(`Valid test case ${testCaseIndex} of type ${typeName} failed to validate.\n${details}`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.typeName = typeName
    this.testCaseIndex = testCaseIndex
    this.details = details
  }
}
