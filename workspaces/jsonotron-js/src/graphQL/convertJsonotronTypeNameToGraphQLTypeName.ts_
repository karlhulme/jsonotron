import { capitalizeInitialLetters } from '../utils'

/**
 * Returns a GraphQL equivalent type name for the given Jsonotron type name
 * following the GraphQL naming conventions.
 * GraphQL does not support namespaces so this function can produce the same
 * GraphQL type name for different Jsonotron type names, but this could be handled
 * in future with a mapping object that substitutes in different names where clashes
 * are known to occur.
 * @param fqn A fully qualified Jsonotron type name.
 * @param isInput True if the resultant type will be treated as an input.
 */
export function convertJsonotronTypeNameToGraphQLTypeName (fqn: string, isInput: boolean): string {
  const slashIndex = fqn.lastIndexOf('/')
  const graphQLTypeName = capitalizeInitialLetters(fqn.slice(slashIndex + 1)) + (isInput ? 'Input' : '')
  return graphQLTypeName
}