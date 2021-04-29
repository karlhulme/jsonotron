import Ajv from 'ajv'
import { TypeLibrary } from 'jsonotron-interfaces'

/**
 * Creates a JSON schema validator from the given type library that
 * can be used to validate values described by the library.
 * @param typeLibrary A type library.
 */
export function createAjvFromTypeLibrary (typeLibrary: TypeLibrary): Ajv {
  const schemas = [
    ...typeLibrary.boolTypes.map(boolType => boolType.jsonSchema),
    ...typeLibrary.enumTypes.map(enumType => enumType.jsonSchema),
    ...typeLibrary.floatTypes.map(floatType => floatType.jsonSchema),
    ...typeLibrary.intTypes.map(intType => intType.jsonSchema),
    ...typeLibrary.objectTypes.map(objectType => objectType.jsonSchema),
    ...typeLibrary.recordTypes.map(recordType => recordType.jsonSchema),
    ...typeLibrary.stringTypes.map(stringType => stringType.jsonSchema)
  ]

  return new Ajv({
    ownProperties: true,
    schemas
  })
}
