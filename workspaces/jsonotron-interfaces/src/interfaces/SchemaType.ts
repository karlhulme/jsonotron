import { JsonotronBaseType } from './JsonotronBaseType'
import { SchemaTypeValidTestCase } from './SchemaTypeValidTestCase'
import { SchemaTypeVariant } from './SchemaTypeVariant'

/**
 * Represents a type based on a JSON schema.
 */
export interface SchemaType extends JsonotronBaseType {
  /**
   * An array of values that can be represented by this type.
   * Some of these cases may also serve as example usages of the type.
   */
  validTestCases: SchemaTypeValidTestCase[]

  /**
   * An array of values that cannot be represented by this type. 
   */
  invalidTestCases?: unknown[]

  /**
   * A JSON schema.
   */
  jsonSchema: Record<string, unknown>

  /**
   * An array of variants to this type.
   */
  variants?: SchemaTypeVariant[]
}
