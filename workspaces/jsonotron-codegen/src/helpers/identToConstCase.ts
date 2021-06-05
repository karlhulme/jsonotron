import { snakeCase } from 'lodash'
 
/**
 * Converts the given ident to const case.
 * @param ident An identifier
 */
export function identToConstCase (ident?: string): string {
  return snakeCase(ident || '').toUpperCase()
}
