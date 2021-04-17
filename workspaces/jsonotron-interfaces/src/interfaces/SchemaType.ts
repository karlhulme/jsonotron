import { JsonotronBaseType } from './JsonotronBaseType'
import { SchemaTypeExample } from './SchemaTypeExample'
import { SchemaTypeVariant } from './SchemaTypeVariant'

/**
 * Represents a type based on a JSON schema.
 */
export interface SchemaType extends JsonotronBaseType {
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

  /**
   * An array of variants to this type.
   */
  variants: SchemaTypeVariant[]
}
