import { GraphQLMap } from '../interfaces'
import { convertJsonotronTypeNameToGraphQLTypeName } from './convertJsonotronTypeNameToGraphQLTypeName'

/**
 * Wraps the given referenced type in a number of array indicators.
 * @param arrayCount The number of arrays to wrap the type in.
 * @param typeName The name of the referenced type. 
 */
function wrapRefTypeWithArray (arrayCount: number, typeName: string): string {
  return `${'['.repeat(arrayCount)}${typeName}${arrayCount > 0 ? '!' : ''}${']'.repeat(arrayCount)}`
}

/**
 * Resolves the given type name to a scalar or a defined type,
 * applying the array indicators and capitalisation expected of
 * GraphQL type names.
 * @param fqnTypeName A fully qualified Jsonotron type name.
 * @param arrayCount The number of array indicators that should be applied to the type.
 * @param graphQLTypes An array of graph QL types.
 * @param isInput True if the type should be treated as an input type.
 */
export function resolveJsonotronTypeToGraphQLType (fqnTypeName: string, arrayCount: number, map: GraphQLMap, isInput: boolean): string {
  const matchedRefType = map.refTypes.find(t => t.name === fqnTypeName)

  // we matched a ref type, if it's a GraphQL scalar we can return that type
  // otherwise we need to repeat the search using the new (resolved) type name.
  if (matchedRefType) {
    if (matchedRefType.isScalarRef) {
      return wrapRefTypeWithArray(arrayCount + matchedRefType.refTypeArrayCount, matchedRefType.refTypeName)
    } else {
      return resolveJsonotronTypeToGraphQLType(matchedRefType.refTypeName, arrayCount + matchedRefType.refTypeArrayCount, map, isInput)
    }
  }

  const matchedObjectType = map.objectTypes.find(t => t.name === fqnTypeName)

  // we matched an object type, so we need to return it but apply formatting.
  if (matchedObjectType) {
    return wrapRefTypeWithArray(arrayCount, convertJsonotronTypeNameToGraphQLTypeName(matchedObjectType.name, isInput))
  }

  // we failed to resolve the type name
  return 'Type_Not_Resolved'
}
