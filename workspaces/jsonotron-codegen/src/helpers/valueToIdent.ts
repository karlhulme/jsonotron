/**
 * Converts the given value to a code token.
 * @param value Any string value.
 */
export function valueToIdent (value: string): string {
  return value
    .replace(/[^a-zA-Z0-9]/g, '_') // swap invalid characters for underscores
    .replace(/^[^a-zA-Z_]/, c => '_' + c) // insert an _ if the initial character is not alpha
}
