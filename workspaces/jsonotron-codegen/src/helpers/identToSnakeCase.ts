import { snakeCase } from 'lodash'
 
/**
 * Converts the given ident to snake case.
 * @param ident An identifier
 */
export function identToSnakeCase (ident: string): string {
  return snakeCase(ident)
}