import { EnumType, SchemaType } from 'jsonotron-interfaces'

/**
 * An array of strings, one for each uniquely identified Jsonotron system.
 * @param enumTypes An array of enum types.
 * @param schemaTypes An array of schema types.
 */
export function getUniqueSystems (enumTypes: EnumType[], schemaTypes: SchemaType[]): string[] {
  const result: string[] = []

  enumTypes.forEach(enumType => {
    if (!result.includes(enumType.system)) {
      result.push(enumType.system)
    }
  })

  schemaTypes.forEach(schemaType => {
    if (!result.includes(schemaType.system)) {
      result.push(schemaType.system)
    }
  })

  return result
}
