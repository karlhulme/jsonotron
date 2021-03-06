/**
 * Returns the given string converted to snake case.
 * @param s The string to convert.
 */
export function camelToSnakeCase (s: string): string {
  return s.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}
