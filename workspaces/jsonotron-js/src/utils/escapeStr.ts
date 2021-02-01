/**
 * Returns the given string with single quotes escaped
 * with a preceding backslash.
 * @param s A string to escape.
 */
export function escapeStr (s: string): string {
  return s.replace(/[']/g, '\\\'')
}
