import { EnumType, TypeMap, TypeMapObjectProperty } from 'jsonotron-interfaces'
import { TypeMapExample } from 'jsonotron-interfaces/types/interfaces/TypeMapExample'

/**
 * Adds the types found in the given JSON schema to the given type map.
 * @param system The system of the owning Jsonotron schemaType.
 * @param proposedTypeName The proposed name of the type, which is either the
 * name of the SchemaType from which the jsonSchema is taken, or in the case of
 * an object property, it is the name of the owning SchemaType combined with
 * the chain of property names separated by an underscore.
 * @param rootType True if the type was defined at the top level of a schema type
 * or enum type.
 * @param examples An array of documented examples of the uage of the type.
 * @param arrayCount The number of array elements the current type has
 * been found to be inside.
 * @param jsonSchema A json schema snippet.
 * @param map A map of types and references.
 * @param enumTypes An array of enum types.
 */
export function addJsonSchemaToTypeMap (system: string, proposedTypeName: string, rootType: boolean, examples: TypeMapExample[], arrayCount: number, jsonSchema: Record<string, unknown>, map: TypeMap, enumTypes: EnumType[]): void {
  if (Array.isArray(jsonSchema.enum) && jsonSchema.enum.length > 0) {
    // A json-schema enum
    const exampleEnumItem = jsonSchema.enum[0]
    const exampleEnumItemScalarType = typeof exampleEnumItem === 'string'
      ? 'string'
      : typeof exampleEnumItem === 'number'
        ? 'number'
        : typeof exampleEnumItem === 'boolean'
          ? 'boolean'
          : 'object'

    map.refTypes.push({
      system,
      name: proposedTypeName,
      documentation: jsonSchema['j-documentation'] as string || 'A bespoke enum type',
      rootType,
      examples: [],
      refTypeName: exampleEnumItemScalarType,
      refTypeArrayCount: arrayCount,
      isScalarRef: true,
      isEnumRef: false // it is not one of our EnumTypes
    })
  } else if (typeof jsonSchema.$ref === 'string') {
    // A json-schema reference to another type
    const refTypeName = jsonSchema.$ref.startsWith('../')
      ? jsonSchema.$ref.replace('../', '') // relative path like ../otherSystem/type -> otherSystem/type
      : `${system}/${jsonSchema.$ref}` // short path like type -> system/type

    map.refTypes.push({
      system,
      name: proposedTypeName,
      documentation: `A reference to the ${refTypeName} type.`,
      rootType,
      examples: [],
      refTypeName,
      refTypeArrayCount: arrayCount,
      isScalarRef: false,
      isEnumRef: false
    })
  } else if (['string', 'number', 'integer', 'boolean'].includes(jsonSchema.type as string)) {
    // A primitive type.
    map.refTypes.push({
      system,
      name: proposedTypeName,
      documentation: jsonSchema['j-documentation'] as string || `A scalar type based on ${jsonSchema.type}.`,
      rootType,
      examples,
      refTypeName: jsonSchema.type as string,
      refTypeArrayCount: arrayCount,
      isScalarRef: true,
      isEnumRef: false
    })
  } else if (jsonSchema.type === 'array' && typeof jsonSchema.items === 'object' && !Array.isArray(jsonSchema.items)) {
    // An array type.
    // Increase the number of array brackets and resolve the 'items' property
    addJsonSchemaToTypeMap(system, proposedTypeName, false, [], arrayCount + 1, jsonSchema.items as Record<string, unknown>, map, enumTypes)
  } else if (jsonSchema.type === 'object' && jsonSchema.additionalProperties === false && typeof jsonSchema.properties === 'object' && jsonSchema.properties !== null) {
    // An object defined by a set of properties - an Object-type.
    
    // First, create types for each of the child properties, as we don't know which will require types vs scalars references.
    const objectProperties = jsonSchema.properties as Record<string, unknown>
    const objectRequireds = (jsonSchema.required || []) as string[]
    const objectSubProperties: TypeMapObjectProperty[] = []
    
    // Second, add those child properties to the type map
    Object.keys(jsonSchema.properties).map(subPropertyName => {
      const isRequired = objectRequireds.includes(subPropertyName)
      const subPropertyTypeName = proposedTypeName + '_' + subPropertyName
      const subProperty = objectProperties[subPropertyName] as Record<string, unknown>
      addJsonSchemaToTypeMap(system, subPropertyTypeName, false, [], 0, subProperty, map, enumTypes)

      objectSubProperties.push({
        propertyName: subPropertyName,
        documentation: subProperty['j-documentation'] as string || '',
        refTypeName: `${system}/${subPropertyTypeName}`,
        isRequired
      })
    })

    // Finally, add the parent type
    map.objectTypes.push({
      system,
      name: proposedTypeName,
      documentation: (jsonSchema['j-documentation'] || `The ${proposedTypeName} type.`) as string,
      rootType,
      examples,
      objectTypeArrayCount: arrayCount,
      properties: objectSubProperties
    })
  } else {
    // Type attribute is missing, contains an array or is generally not understood,
    // so we have to use the object type.
    map.refTypes.push({
      system,
      name: proposedTypeName,
      documentation: `The fallback type because the JSON schema was not understood.`,
      rootType,
      examples,
      refTypeName: 'object',
      refTypeArrayCount: arrayCount,
      isScalarRef: true,
      isEnumRef: false
    })
  }
}
