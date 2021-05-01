import { JsonotronType, TypeLibrary } from 'jsonotron-interfaces'

/**
 * Returns the given type library but with only the types
 * that are associated with one of the given systems.
 * @param typeLibrary A type library.
 * @param systems An array of systems.
 */
export function filterTypeLibrary (typeLibrary: TypeLibrary, systems: string[]): TypeLibrary {
  const systemFilter = function (type: JsonotronType) {
    return systems.includes(type.system)
  }

  return {
    jsonSchemaDomain: typeLibrary.jsonSchemaDomain,
    boolTypes: typeLibrary.boolTypes.filter(systemFilter),
    enumTypes: typeLibrary.enumTypes.filter(systemFilter),
    floatTypes: typeLibrary.floatTypes.filter(systemFilter),
    intTypes: typeLibrary.intTypes.filter(systemFilter),
    objectTypes: typeLibrary.objectTypes.filter(systemFilter),
    recordTypes: typeLibrary.recordTypes.filter(systemFilter),
    stringTypes: typeLibrary.stringTypes.filter(systemFilter)
  }
}
