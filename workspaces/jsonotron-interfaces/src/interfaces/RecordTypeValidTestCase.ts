/**
 * Represents a valid test case of a record type.
 */
export interface RecordTypeValidTestCase {
  /**
   * An example value.
   */
  value: unknown

  /**
  * If populated, this valid test case serves as an example use
  * of a record that can be used in documentation.
  */
  summary: string
}
