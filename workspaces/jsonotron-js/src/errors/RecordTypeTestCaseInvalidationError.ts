/**
 * Raised if a record type test case passes validation when it
 * was expected to fail.
 */
export class RecordTypeTestCaseInvalidationError extends Error {
  recordTypeName: string
  testCaseIndex: number

  /**
   * Constructs a new instance.
   * @param recordTypeName The name of a record type.
   * @param testCaseIndex The index of the invalid test case.
   */
  constructor (recordTypeName: string, testCaseIndex: number) {
    super(`Invalid test case ${testCaseIndex} of record type ${recordTypeName} passed validation but it was expected to fail.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.recordTypeName = recordTypeName
    this.testCaseIndex = testCaseIndex
  }
}
