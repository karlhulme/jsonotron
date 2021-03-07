
/**
 * Prefixes an underscore to the given value if the first
 * character is not a letter, otherwise returns the value unchanged.
 * @param value The value to check.
 */
export function ensureInitialCharacter (value: string): string {
  return (/^[a-zA-Z]/.test(value))
    ? value
    : '_' + value
}
