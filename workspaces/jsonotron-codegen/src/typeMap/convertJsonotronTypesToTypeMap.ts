import { EnumType, TypeMap, SchemaType } from 'jsonotron-interfaces'
import { addJsonSchemaToTypeMap } from './addJsonSchemaToTypeMap'

/**
 * Returns a TypeMap built from the given enum and schema types.
 * @param enumTypes An array of enum types.
 * @param schemaTypes An array of schema types.
 */
export function convertJsonotronTypesToTypeMap (enumTypes: EnumType[], schemaTypes: SchemaType[]): TypeMap {
  const map: TypeMap = {
    objectTypes: [],
    refTypes: []
  }

  // all enums are based on the json schema string type. 
  enumTypes.forEach(enumType => {
    const fqn = `${enumType.domain}/${enumType.system}/${enumType.name}`
    map.refTypes.push({ name: fqn, refTypeName: 'string', refTypeArrayCount: 0, isScalarRef: true })

    if (enumType.dataJsonSchema) {
      addJsonSchemaToTypeMap(
        enumType.domain,
        enumType.system,
        enumType.name + '_data',
        0,
        enumType.dataJsonSchema,
        map,
        []
      )
    }
  })

  // to convert schemaTypes we look at the jsonSchema property.
  schemaTypes.forEach(schemaType => {
    addJsonSchemaToTypeMap(
      schemaType.domain,
      schemaType.system,
      schemaType.name,
      0,
      { documentation: schemaType.documentation, ...schemaType.jsonSchema },
      map,
      enumTypes
    )
  })

  return map
}
