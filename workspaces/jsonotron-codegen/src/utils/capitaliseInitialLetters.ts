/**
 * Returns the given string but with the first letter capitalised
 * along with another other characters that appear after an underscore.
 * @param s A string.
 */
export function capitaliseInitialLetters (s: string): string {
  return s.replace(/^[a-z]|_[a-z]/g, word => word.toUpperCase())
}
