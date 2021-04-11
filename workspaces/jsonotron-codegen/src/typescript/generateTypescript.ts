import { EnumType, SchemaType } from 'jsonotron-interfaces'
import { generateEnumTypeItems } from './generateEnumTypeItems'
import { generateEnumTypeResolvers } from './generateEnumTypeResolvers'
import { generateEnumTypeValues } from './generateEnumTypeValues'
import { generateJsonSchemaConstants } from './generateJsonSchemaConstants'
import { generateSchemaTypeInterfaces } from './generateSchemaTypeInterfaces'
import { generateSchemaTypeValidators } from './generateSchemaTypeValidators'
import { getStandardCode } from './getStandardCode'

interface GenerateOptions {
  domain: string
  enumTypes: EnumType[]
  schemaTypes: SchemaType[]
}

export function generateTypescript (options: GenerateOptions): string {
  const lines = []

  // standard code
  lines.push(...getStandardCode())

  // json schemas for enum types, and json schema for schema types (both full and partial)
  lines.push(...generateJsonSchemaConstants(options.domain, options.enumTypes, options.schemaTypes))

  // typescript interfaces for schema types
  lines.push(...generateSchemaTypeInterfaces(options.enumTypes, options.schemaTypes))

  // enum values where you can access example.value1 or example.value2
  lines.push(...generateEnumTypeValues(options.enumTypes))

  // enum items where you can access the full enumType definition, e.g. item.name, item.value and item.data
  lines.push(...generateEnumTypeItems(options.enumTypes))

  // enum resolvers
  lines.push(...generateEnumTypeResolvers(options.enumTypes))

  // validaator methods
  lines.push(...generateSchemaTypeValidators(options.domain, options.schemaTypes))

  return lines.join('\n\n')
}
