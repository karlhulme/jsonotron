/**
 * Converts the given ident having capitalised the first letter, 
 * or any letter that appears immediately after an underscore.
 * @param ident A string.
 */
 export function identToPascalCase (ident: string): string {
  return ident.replace(/^[a-z]|_[a-z]/g, c => c.toUpperCase())
}
