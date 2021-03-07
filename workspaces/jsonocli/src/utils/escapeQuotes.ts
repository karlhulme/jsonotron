/**
 * Returns the given string with single quotes escaped
 * with a preceding backslash.
 * @param s A string to escape.
 */
export function escapeQuotes (s: string): string {
  return s.replace(/[']/g, '\\\'')
}
