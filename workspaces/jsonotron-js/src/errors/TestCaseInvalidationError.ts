/**
 * Raised if a jsonotron type test case passes validation when it
 * was expected to fail.
 */
export class TestCaseInvalidationError extends Error {
  typeName: string
  testCaseIndex: number

  /**
   * Constructs a new instance.
   * @param typeName The name of a type.
   * @param testCaseIndex The index of the invalid test case.
   */
  constructor (typeName: string, testCaseIndex: number) {
    super(`Invalid test case ${testCaseIndex} of type ${typeName} passed validation but it was expected to fail.`)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name

    this.typeName = typeName
    this.testCaseIndex = testCaseIndex
  }
}
