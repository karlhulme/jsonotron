import { snakeCase } from 'lodash'
 
/**
 * Converts the given value to a code token in uppercase.
 * @param value Any string value.
 */
export function valueToConstCase (value?: string): string {
  return snakeCase(value || '')
    .replace(/[^a-zA-Z0-9]/g, '_') // swap invalid characters for underscores
    .replace(/^[^a-zA-Z_]/, c => '_' + c) // insert an _ if the initial character is not alpha
    .toUpperCase()
}