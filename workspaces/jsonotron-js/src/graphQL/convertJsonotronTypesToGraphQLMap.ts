import { EnumType, GraphQLMap, SchemaType } from '../interfaces'
import { addJsonSchemaToGraphQLMap } from './addJsonSchemaToGraphQLMap'

/**
 * Returns a GraphQLMap built from the given enum and schema types..
 * @param enumTypes An array of enum types.
 * @param schemaTypes An array of schema types.
 */
export function convertJsonotronTypesToGraphQLMap (enumTypes: EnumType[], schemaTypes: SchemaType[]): GraphQLMap {
  const map: GraphQLMap = {
    objectTypes: [],
    refTypes: []
  }

  // all enums are mapped to the GraphGL string type. 
  enumTypes.forEach(enumType => {
    const fqn = `${enumType.domain}/${enumType.system}/${enumType.name}`
    map.refTypes.push({ name: fqn, refTypeName: 'String', refTypeArrayCount: 0, isScalarRef: true })
  })

  // to convert schemaTypes we look at the jsonSchema property.
  schemaTypes.forEach(schemaType => {
    addJsonSchemaToGraphQLMap(
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
