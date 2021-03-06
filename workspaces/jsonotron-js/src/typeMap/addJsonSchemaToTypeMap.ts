import { EnumType, TypeMap, TypeMapObject, TypeMapObjectProperty } from '../interfaces'

/**
 * Adds the types found in the given JSON schema to the given type map.
 * @param domain The domain of the owning Jsonotron schemaType.
 * @param system The system of the owning Jsonotron schemaType.
 * @param proposedTypeName The proposed name of the type, which is either the
 * name of the SchemaType from which the jsonSchema is taken, or in the case of
 * an object property, it is the name of the owning SchemaType combined with
 * the chain of property names separated by an underscore.
 * @param arrayCount The number of array elements the current type has
 * been found to be inside.
 * @param jsonSchema A json schema snippet.
 * @param map A map of types and references.
 * @param enumTypes An array of enum types.
 */
export function addJsonSchemaToTypeMap (domain: string, system: string, proposedTypeName: string, arrayCount: number, jsonSchema: Record<string, unknown>, map: TypeMap, enumTypes: EnumType[]): void {
  const fqn = `${domain}/${system}/${proposedTypeName}`

  if (Array.isArray(jsonSchema.enum) && jsonSchema.enum.length > 0) {
    const exampleEnumItem = jsonSchema.enum[0]
    const exampleEnumItemScalarType = typeof exampleEnumItem === 'string'
      ? 'string'
      : typeof exampleEnumItem === 'number'
        ? 'number'
        : typeof exampleEnumItem === 'boolean'
          ? 'boolean'
          : 'object'
    map.refTypes.push({ name: fqn, refTypeName: exampleEnumItemScalarType, refTypeArrayCount: arrayCount, isScalarRef: true })
  } else if (typeof jsonSchema.$ref === 'string') {
    // A reference to another type, we'll need the fully qualified name.
    const refFqn = jsonSchema.$ref.includes('/') ? jsonSchema.$ref : `${domain}/${system}/${jsonSchema.$ref}`
    map.refTypes.push({ name: fqn, refTypeName: refFqn, refTypeArrayCount: arrayCount, isScalarRef: false})
  } else if (['string', 'number', 'integer', 'boolean'].includes(jsonSchema.type as string)) {
    // A primitive type.
    map.refTypes.push({ name: fqn, refTypeName: jsonSchema.type as string, refTypeArrayCount: arrayCount, isScalarRef: true})
  } else if (jsonSchema.type === 'array' && typeof jsonSchema.items === 'object') {
    // An array type.
    // Increase the number of array brackets and resolve the 'items' property
    const innerType = Array.isArray(jsonSchema.items) && jsonSchema.items.length > 0 ? jsonSchema.items[0] : jsonSchema.items
    addJsonSchemaToTypeMap(domain, system, proposedTypeName, arrayCount + 1, innerType as Record<string, unknown>, map, enumTypes)
  } else if (jsonSchema.type === 'object' && jsonSchema.additionalProperties === false && typeof jsonSchema.properties === 'object' && jsonSchema.properties !== null) {
    // A child object, which will require it's own type.
    // Create types for each of the child properties, as we don't know which will require types vs scalars references.
    const objectProperties = jsonSchema.properties as Record<string, unknown>
    const objectRequireds = (jsonSchema.required || []) as string[]
    const objectSubProperties: TypeMapObjectProperty[] = []
    
    Object.keys(jsonSchema.properties).map(subPropertyName => {
      const isRequired = objectRequireds.includes(subPropertyName)
      const subPropertyTypeName = proposedTypeName + '_' + subPropertyName
      const subProperty = objectProperties[subPropertyName] as Record<string, unknown>
      addJsonSchemaToTypeMap(domain, system, subPropertyTypeName, 0, subProperty, map, enumTypes)

      // Pull out field-level documentation if its been provided.
      let documentation = subProperty.documentation as string || ''

      // Spot references to enums, and include in the documentation of the field.
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
      objectTypeArrayCount: arrayCount,
      properties: objectSubProperties
    } as TypeMapObject)
  } else {
    // Type attribute is missing, contains an array or is generally not understood,
    // so we have to use the object type.
    map.refTypes.push({ name: fqn, refTypeName: 'object', refTypeArrayCount: arrayCount, isScalarRef: true})
  }
}
