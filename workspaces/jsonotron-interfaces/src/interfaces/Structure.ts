import { Field } from './Field'

/**
 * Represents a named collection of fields that can be validated.
 */
export interface Structure {
  /**
   * The unique name for the structure.
   */
  name: string

  /**
   * Documentation that describes the usage of intention of this structure.
   */
  documentation?: string

  /**
   * The fields that make up this structure.
   */
  fields: Record<string, Field>
}
