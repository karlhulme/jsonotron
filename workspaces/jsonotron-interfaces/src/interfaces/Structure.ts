import { Field } from './Field'
import { JsonotronResource } from './JsonotronResource'

/**
 * Represents a named collection of fields that can be validated.
 */
export interface Structure extends JsonotronResource {
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
