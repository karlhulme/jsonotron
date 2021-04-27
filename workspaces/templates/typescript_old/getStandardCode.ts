/**
 * Returns the standard code.
 */
export function getStandardCode (): string[] {
  return [`
/* istanbul ignore file */
/* Generated: ${new Date().toISOString()} */

import Ajv from 'ajv'

let ajv: Ajv.Ajv

/**
* Represents an item in an enumeration.
*/
export interface EnumTypeItem {
  /**
   * The underlying value of the item.
   */
  value: string
  
  /**
   * The display text of the value in English.
   */
  text: string
  
  /**
   * The documentation associated with this item.
   */
  documentation?: string
  
  /**
   * If populated, this value explains why the value was deprecated and/or which item to use instead.
   */
  deprecated?: string
  
  /**
   * A symbol associated with the item
   */
  symbol?: string
}
  
/**
 * Represents an enum type that provides additional data
 * for each enum type item that conforms to type T.
 */
export interface ExtendedEnumTypeItem<T> extends EnumTypeItem {
  data: T
}

/**
 * Initialises the AJV validation engine with the given formatters.
 * This function must be called before attempting to perform any validation.
 * @param formatters A record of formatter names and formatter validation functions.
 */
export function initialise (formatters?: Record<string, unknown>): void {
  if (!ajv) {
    ajv = new Ajv({
      format: 'full', // 'full' mode supports format validators
      ownProperties: true, // only iterate over objects found directly on the object
      schemas: allJsonSchemas,
      formats: formatters
    })
  }
}

/**
 * This function raises an error if the given value cannot
 * be validated against the schema stored for the given schena id.
 * @param value The value to validate.
 * @param schemaId The id of a schema.
 */
export function validateValue (value: unknown, schemaId: string): void {
  if (!ajv) {
    throw new Error('Need to call exported initialise function.')
  }

  const validator = ajv.getSchema(schemaId) as Ajv.ValidateFunction

  if (!validator) {
    throw new Error('Internal error - Validator not found.')
  }

  if (!validator(value)) {
    throw new Error(ajvErrorsToString(validator.errors))
  }
} 

/**
 * Convert AJV errors to a string.
 * @param errors An array of error objects.
 */
function ajvErrorsToString (errors?: Ajv.ErrorObject[]|null) {
  /* istanbul ignore next - errors will never be null/undefined */
  return JSON.stringify(errors || [], null, 2)
}
  
`]
}
