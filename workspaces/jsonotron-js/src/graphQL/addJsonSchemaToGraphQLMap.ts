import { EnumType, GraphQLMap, GraphQLObjectType, GraphQLObjectTypeProperty } from '../interfaces'

/**
 * Adds the types found in the given JSON schema to the given GraphQL map.
 * @param domain The domain of the owning Jsonotron schemaType.
 * @param system The system of the owning Jsonotron schemaType.
 * @param proposedTypeName The proposed name of the type, which is either the
 * name of the SchemaType from which the jsonSchema is taken, or in the case of
 * an object property, it is the name of the owning SchemaType combined with
 * the chain of property names separated by an underscore.
 * @param arrayCount The number of array elements the current type has
 * been found to be inside.
 * @param jsonSchema A json schema snippet.
 * @param map A map of GraphQL types and references.
 * @param enumTypes An array of enum types.
 */
export function addJsonSchemaToGraphQLMap (domain: string, system: string, proposedTypeName: string, arrayCount: number, jsonSchema: Record<string, unknown>, map: GraphQLMap, enumTypes: EnumType[]): void {
  const fqn = `${domain}/${system}/${proposedTypeName}`

  if (Array.isArray(jsonSchema.enum)) {
    const exampleEnumItem = jsonSchema.enum[0]
    const exampleEnumItemScalarType = typeof exampleEnumItem === 'string'
      ? 'String'
      : typeof exampleEnumItem === 'number'
        ? 'Float'
        : typeof exampleEnumItem === 'boolean'
          ? 'Boolean'
          : 'JSON'
    map.refTypes.push({ name: fqn, refTypeName: exampleEnumItemScalarType, refTypeArrayCount: arrayCount, isScalarRef: true })
  } else if (typeof jsonSchema.$ref === 'string') {
    // a reference to another type, we'll need the fully qualified name
    const refFqn = jsonSchema.$ref.includes('/') ? jsonSchema.$ref : `${domain}/${system}/${jsonSchema.$ref}`
    map.refTypes.push({ name: fqn, refTypeName: refFqn, refTypeArrayCount: arrayCount, isScalarRef: false})
  } else if (jsonSchema.type === 'string') {
    map.refTypes.push({ name: fqn, refTypeName: 'String', refTypeArrayCount: arrayCount, isScalarRef: true})
  } else if (jsonSchema.type === 'number') {
    map.refTypes.push({ name: fqn, refTypeName: 'Float', refTypeArrayCount: arrayCount, isScalarRef: true})
  } else if (jsonSchema.type === 'integer') {
    map.refTypes.push({ name: fqn, refTypeName: 'Int', refTypeArrayCount: arrayCount, isScalarRef: true})
  } else if (jsonSchema.type === 'boolean') {
    map.refTypes.push({ name: fqn, refTypeName: 'Boolean', refTypeArrayCount: arrayCount, isScalarRef: true})
  } else if (jsonSchema.type === 'array' && typeof jsonSchema.items === 'object') {
    // an array type
    // increase the number of array brackets and resolve the 'items' property
    const innerType = Array.isArray(jsonSchema.items) ? jsonSchema.items[0] : jsonSchema.items
    addJsonSchemaToGraphQLMap(domain, system, proposedTypeName, arrayCount + 1, innerType as Record<string, unknown>, map, enumTypes)
  } else if (jsonSchema.type === 'object' && jsonSchema.additionalProperties === false && typeof jsonSchema.properties === 'object' && jsonSchema.properties !== null) {
    // a child object, which will require it's own GraphQL type.
    // create types for each of the child properties, as we don't know which will require types vs scalars references.
    const objectProperties = jsonSchema.properties as Record<string, unknown>
    const objectRequireds = (jsonSchema.required || []) as string[]
    const objectSubProperties: GraphQLObjectTypeProperty[] = []
    
    Object.keys(jsonSchema.properties).map(subPropertyName => {
      const isRequired = objectRequireds.includes(subPropertyName)
      const subPropertyTypeName = proposedTypeName + '_' + subPropertyName
      const subProperty = objectProperties[subPropertyName] as Record<string, unknown>
      addJsonSchemaToGraphQLMap(domain, system, subPropertyTypeName, 0, subProperty, map, enumTypes)

      // pull out field-level documentation if its been provided.
      let documentation = subProperty.documentation as string || ''

      // spot references to enums, and include in the documentation of the field.
      const subPropertyRefName = typeof subProperty.$ref === 'string'
        ? subProperty.$ref.includes('/') ? subProperty.$ref : `${domain}/${system}/${subProperty.$ref}`
        : null
      const matchedEnumType = enumTypes.find(e => `${e.domain}/${e.system}/${e.name}` === subPropertyRefName)
      documentation += matchedEnumType
        ? `A value from the **${matchedEnumType.name}** enum of the **${matchedEnumType.system}** type system defined by **${matchedEnumType.domain}**.`
        : ''

      objectSubProperties.push({ propertyName: subPropertyName, documentation, refTypeName: `${domain}/${system}/${subPropertyTypeName}`, isRequired })
    })

    map.objectTypes.push({
      name: `${domain}/${system}/${proposedTypeName}`,
      documentation: (jsonSchema.documentation || `The ${proposedTypeName} type.`) as string,
      properties: objectSubProperties
    } as GraphQLObjectType)
  } else {
    // type attribute is missing, contains an array or is generally not understood.
    // treat these as JSON.
    map.refTypes.push({ name: fqn, refTypeName: 'JSON', refTypeArrayCount: arrayCount, isScalarRef: true})
  }
}
