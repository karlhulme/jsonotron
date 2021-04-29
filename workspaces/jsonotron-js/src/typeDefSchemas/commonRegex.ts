/**
 * The regex for a type reference that can be optionally qualified with
 * a type name.  So valid values would be `shortString` and `jss/shortString`.
 */
export const typeReferenceRegex = '^([a-z][_a-zA-Z0-9]*/)?[a-z][_a-zA-Z0-9]*$'

/**
 * The regex for an identifier that must begin with a lowercase letter
 * and use only letters and numbers and underscores in the rest of the name.
 */
export const identifierRegex = '^[a-z][_a-zA-Z0-9]*$'
