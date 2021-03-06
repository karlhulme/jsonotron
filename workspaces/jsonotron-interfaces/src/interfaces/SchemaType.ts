import { SchemaTypeExample } from './SchemaTypeExample'

/**
 * Represents a type based on a JSON schema.
 */
export interface SchemaType {
  /**
   * The domain of the owning type system.
   */
  domain: string

  /**
   * The name of the type system.
   */
  system: string

  /**
   * The system name of the type.
   */
  name: string

  /**
   * The display name of the type.
   */
  title: string

  /**
   * The documentation for the schema type.
   */
  documentation: string

  /**
   * An array of explained examples.
   */
  examples: SchemaTypeExample[]

  /**
   * An array of values that can be represented by this type.
   */
  validTestCases: unknown[]

  /**
   * An array of values that cannot be represented by this type. 
   */
  invalidTestCases: unknown[]

  /**
   * A JSON schema.
   */
  jsonSchema: Record<string, unknown>
}
