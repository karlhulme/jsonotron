/**
 * Represents an example for type T.
 */
 export interface Example<T> {
  /**
   * An example value.
   */
  value: T

  /**
  * If populated, describes the the example.
  */
  summary?: string
}