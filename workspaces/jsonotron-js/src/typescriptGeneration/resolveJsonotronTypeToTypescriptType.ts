import { TypeMap } from '../interfaces'
import { convertJsonotronScalarNameToTypescriptScalarName } from './convertJsonotronScalarNameToTypescriptScalarName'
import { convertJsonotronTypeNameToTypescriptInterfaceName } from './convertJsonotronTypeNameToTypescriptInterfaceName'

/**
 * Appends the given referenced type in a number of array indicators.
 * @param arrayCount The number of arrays to wrap the type in.
 * @param typeName The name of the referenced type. 
 */
function appendArrayIndicators (arrayCount: number, typeName: string): string {
  return `${typeName}${'[]'.repeat(arrayCount)}`
}

/**
 * Resolves the given type name to a scalar or a defined type,
 * applying the array indicators and capitalisation expected of
 * typescript type names.
 * @param fqnTypeName A fully qualified Jsonotron type name.
 * @param arrayCount The number of array indicators that should be applied to the type.
 * @param map A type map.
 */
export function resolveJsonotronTypeToTypescriptType (fqnTypeName: string, arrayCount: number, map: TypeMap): string {
  const matchedRefType = map.refTypes.find(t => t.name === fqnTypeName)

  // we matched a ref type, if it's a scalar we can return that type
  // otherwise we need to repeat the search using the new (resolved) type name.
  if (matchedRefType) {
    if (matchedRefType.isScalarRef) {
      return appendArrayIndicators(arrayCount + matchedRefType.refTypeArrayCount, convertJsonotronScalarNameToTypescriptScalarName(matchedRefType.refTypeName))
    } else {
      return resolveJsonotronTypeToTypescriptType(matchedRefType.refTypeName, arrayCount + matchedRefType.refTypeArrayCount, map)
    }
  }

  const matchedObjectType = map.objectTypes.find(t => t.name === fqnTypeName)

  // we matched an object type, so we need to return it but apply formatting.
  /* istanbul ignore else */
  if (matchedObjectType) {
    return appendArrayIndicators(arrayCount, convertJsonotronTypeNameToTypescriptInterfaceName(matchedObjectType.name))
  } else {
    // we failed to resolve the type name
    return 'Type_Not_Resolved'
  }
}
