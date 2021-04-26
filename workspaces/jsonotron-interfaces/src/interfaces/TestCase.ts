/**
 * Represents a test case for type T.
 */
export interface TestCase<T> {
  /**
   * An example value.
   */
  value: T

  /**
  * If populated, describes the the test case in a manner that makes
  * it a useful addition to the documentation.
  */
  summary?: string
}
