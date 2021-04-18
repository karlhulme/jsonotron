import { TypeMap } from 'jsonotron-interfaces'
import { ResolvedPropertyType } from './ResolvedPropertyType'

/**
 * Resolves a type assignment (typically to a property), which can include array indicators.
 * @param fqn A qualified type name, such as jss/positiveInteger or a JSON schema type like string.
 * @param arrayCount The number of array wrappers around the type assignment.
 * @param map A type map.
 * @param acceptEnum True if an enum can be returned as a resolved type.  False
 * indicates that this should be further resolved, probably to a string.
 * @returns 
 */
export function resolveTypeAssignment (fqn: string, arrayCount: number, map: TypeMap, acceptEnum: boolean): ResolvedPropertyType {
  if (!fqn.includes('/')) {
    // The fqn does not contain a system so we've resolved all the way to a JSON schema type.
    return { resolutionType: 'jsonSchemaType', system: '', name: fqn, arrayCount }
  }

  const matchedRefType = map.refTypes.find(t => `${t.system}/${t.name}` === fqn)

  if (matchedRefType) {
    // We matched a ref type,
    // If we hit a rootType and it's not an enum (or we're accepting enums) then we can return it,
    // Otherwise we need to keep resolving (it's possible we'll resolve all the way to a JSON schema type)
    if (matchedRefType.rootType && (!matchedRefType.isEnumRef || acceptEnum)) {
      return { resolutionType: 'jsonotronType', system: matchedRefType.system, name: matchedRefType.name, arrayCount: arrayCount + matchedRefType.refTypeArrayCount }
    } else {
      return resolveTypeAssignment(matchedRefType.refTypeName, arrayCount + matchedRefType.refTypeArrayCount, map, acceptEnum)
    }
  }

  const matchedObjectType = map.objectTypes.find(t => `${t.system}/${t.name}` === fqn)

  // We matched an object type, so we need to return it but apply formatting.
  /* istanbul ignore else */
  if (matchedObjectType) {
    return { resolutionType: 'jsonotronType', system: matchedObjectType.system, name: matchedObjectType.name, arrayCount: arrayCount + matchedObjectType.objectTypeArrayCount }
  } else {
    // we have failed to match the type, perhaps it is defined in a different type system.
    return { resolutionType: 'unknown', system: '', name: fqn, arrayCount }
  }
}
