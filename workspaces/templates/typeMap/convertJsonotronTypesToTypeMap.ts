import { EnumType, TypeMap, SchemaType } from 'jsonotron-interfaces'
import { clone } from 'lodash'
import { capitaliseInitialLetters } from '../utils'
import { addJsonSchemaToTypeMap } from './addJsonSchemaToTypeMap'
import { buildVariantJsonSchema } from './buildVariantJsonSchema'

/**
 * The jsonotron types to convert to a type map.
 */
interface ConversionParams {
  enumTypes: EnumType[]
  schemaTypes: SchemaType[]
}

/**
 * Returns a TypeMap built from the given enum and schema types.
 * @param enumTypes An array of enum types.
 * @param schemaTypes An array of schema types.
 */
export function convertJsonotronTypesToTypeMap (params: ConversionParams): TypeMap {
  const map: TypeMap = {
    objectTypes: [],
    refTypes: []
  }

  // all enums are based on the json schema string type. 
  params.enumTypes.forEach(enumType => {
    map.refTypes.push({
      system: enumType.system,
      name: enumType.name,
      documentation: enumType.documentation,
      rootType: true,
      examples: [],
      refTypeName: 'string',
      refTypeArrayCount: 0,
      isScalarRef: false,
      isEnumRef: true,
      enumItems: clone(enumType.items),
      enumItemDataTypeName: enumType.dataJsonSchema ? enumType.name + 'Data' : undefined
    })

    if (enumType.dataJsonSchema) {
      addJsonSchemaToTypeMap(
        enumType.system,
        enumType.name + 'Data',
        true,
        [],
        0,
        enumType.dataJsonSchema,
        map,
        []
      )
    }
  })

  // to convert schemaTypes we look at the jsonSchema property.
  params.schemaTypes.forEach(schemaType => {
    // add the primary definition
    addJsonSchemaToTypeMap(
      schemaType.system,
      schemaType.name,
      true,
      schemaType.validTestCases.filter(testCase => testCase.documentation),
      0,
      schemaType.jsonSchema,
      map,
      params.enumTypes
    )

    // add any variants
    schemaType.variants?.map(variant => {
      addJsonSchemaToTypeMap(
        schemaType.system,
        schemaType.name + capitaliseInitialLetters(variant.name),
        true,
        [],
        0,
        buildVariantJsonSchema(schemaType.jsonSchema, variant),
        map,
        params.enumTypes
      )
    })
  })

  return map
}
