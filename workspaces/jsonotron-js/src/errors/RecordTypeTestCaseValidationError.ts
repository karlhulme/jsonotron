/**
 * Raised if a record type test case fails validation.
 */
export class RecordTypeTestCaseValidationError extends Error {
  recordTypeName: string
  testCaseIndex: number
  details: string

  /**
   * Constructs a new instance.
   * @param recordTypeName The name of a record type.
   * @param testCaseIndex The index of the valid test case.
   * @param details The details of the error.
   */
  constructor (recordTypeName: string, testCaseIndex: number, details: string) {
    super(`Valid test case ${testCaseIndex} of record type ${recordTypeName} failed to validate.\n${details}`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.recordTypeName = recordTypeName
    this.testCaseIndex = testCaseIndex
    this.details = details
  }
}
