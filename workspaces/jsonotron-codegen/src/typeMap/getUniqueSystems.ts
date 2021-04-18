import { TypeMap } from 'jsonotron-interfaces'

/**
 * An array of strings, one for each uniquely identified Jsonotron system,
 * returned in alphabetical order.
 * @param typeMap A type map.
 */
export function getUniqueSystems (typeMap: TypeMap): string[] {
  const result: string[] = []

  typeMap.objectTypes.forEach(objectType => {
    if (!result.includes(objectType.system)) {
      result.push(objectType.system)
    }
  })

  typeMap.refTypes.forEach(refType => {
    if (!result.includes(refType.system)) {
      result.push(refType.system)
    }
  })

  return result.sort()
}
