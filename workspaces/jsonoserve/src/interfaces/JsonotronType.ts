/**
 * Represents an enum or schema type with sufficient
 * fields to uniquely identify it.
 */
export interface JsonotronType {
  /**
   * A value of 'enum' or 'schema'
   */
  kind: 'enum'|'schema'

  /**
   * The domain of the type.
   */
  domain: string

  /**
   * The system that contains the type.
   */
  system: string

  /**
   * The name of the type.
   */
  name: string
}
