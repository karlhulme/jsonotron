import { EnumType, SchemaType } from 'jsonotron-interfaces'
import { createJsonSchemaForEnumType, createJsonSchemaForSchemaType } from 'jsonotron-js'

export function generateJsonSchemaConstants (domain: string, enumTypes: EnumType[], schemaTypes: SchemaType[]): string[] {
  const result: string[] = []

  const jsonSchemaConstantNames: string[] = []

  enumTypes.forEach(enumType => {
    const jsonSchema = createJsonSchemaForEnumType(domain, enumType)
    result.push(`const ${enumType.name}JsonSchema = ${JSON.stringify(jsonSchema, null, 2)}`)
    jsonSchemaConstantNames.push(`${enumType.name}JsonSchema`)
  })

  // TODO: use typeMap object-types instead of schema types
  // TODO: record enumValues in ref-types where appropriate?

  schemaTypes.forEach(schemaType => {
    const jsonSchema = createJsonSchemaForSchemaType(domain, schemaType)
    result.push(`const ${schemaType.name}JsonSchema = ${JSON.stringify(jsonSchema, null, 2)}`)
    jsonSchemaConstantNames.push(`${schemaType.name}JsonSchema`)

    if (schemaType.jsonSchema.type === 'object') {
      const partialJsonSchema = createJsonSchemaForSchemaType(domain, makePartialSchemaType(schemaType))
      result.push(`const ${schemaType.name}PartialJsonSchema = ${JSON.stringify(partialJsonSchema, null, 2)}`)
      jsonSchemaConstantNames.push(`${schemaType.name}PartialJsonSchema`)
    }
  })

  result.push(`const allJsonSchemas = [\n${jsonSchemaConstantNames.map(n => `  ${n}`).join(',\n')}\n]`)

  return result
}

function makePartialSchemaType (schemaType: SchemaType): SchemaType {
  return {
    ...schemaType,
    name: schemaType.name + 'Partial',
    jsonSchema: {
      ...schemaType.jsonSchema,
      required: []
    }
  }
}
