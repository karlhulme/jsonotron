/**
 * Returns the given value but any characters that are not valid
 * in a code property name are converted to an underscore.
 * @param value The value to check.
 */
export function ensureValidCodePropertyCharacters (value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, '_')
}
