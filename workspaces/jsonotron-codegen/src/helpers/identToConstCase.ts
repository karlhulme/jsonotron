import { snakeCase } from 'lodash'
 
/**
 * Converts the given ident to const case.
 * @param ident An identifier
 */
export function identToConstCase (s: string): string {
  return snakeCase(s).toUpperCase()
}