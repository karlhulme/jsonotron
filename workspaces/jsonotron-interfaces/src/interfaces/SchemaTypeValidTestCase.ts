/**
 * Represents a valid test case of a schema type that
 * can optionally be used as an example.
 */
export interface SchemaTypeValidTestCase {
  /**
   * A example value.
   */
  value: unknown

  /**
   * If populated, this valid test case serves as an example use
   * of the schema type.
   */
  documentation: string
}
