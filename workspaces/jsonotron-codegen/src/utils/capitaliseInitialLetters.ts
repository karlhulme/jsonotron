/**
 * Returns the given string having capitalised the first letter, 
 * or any letter that appears immediately after an underscore.
 * @param text A string.
 */
export function capitaliseInitialLetters (text: string): string {
  return text.replace(/^[a-z]|_[a-z]/g, word => word.toUpperCase())
}
