import { EnumType, SchemaType } from 'jsonotron-interfaces'
import { convertJsonotronTypesToTypeMap } from '../typeMap'
import { generateContents } from './generateContents'
import { generateEnumTypeDocumentation } from './generateEnumTypeDocumentation'
import { generateHeader } from './generateHeader'
import { generateRootObjectTypeDocumentation } from './generateRootObjectTypeDocumentation'
import { generateScalarTypeDocumentation } from './generateScalarTypeDocumentation'

interface GenerateOptions {
  enumTypes: EnumType[]
  schemaTypes: SchemaType[]
}

export function generateMarkdown (options: GenerateOptions): string {
  const typeMap = convertJsonotronTypesToTypeMap({
    enumTypes: options.enumTypes,
    schemaTypes: options.schemaTypes
  })

  const scalarTypes = typeMap.refTypes
    .filter(refType => refType.rootType && refType.isScalarRef)
    .sort((a, b) => a.name.localeCompare(b.name))

  const rootObjectTypes = typeMap.objectTypes
    .filter(objectType => objectType.rootType)
    .sort((a, b) => a.name.localeCompare(b.name))

  const enumTypes = typeMap.refTypes
    .filter(refType => refType.rootType && refType.isEnumRef)
    .sort((a, b) => a.name.localeCompare(b.name))

  const lines: string[] = []

  lines.push(`# Type Library`)
  lines.push(...generateHeader(typeMap))
  lines.push(...generateContents(scalarTypes, rootObjectTypes, enumTypes))

  lines.push('## Scalar Types')
  scalarTypes.forEach(scalarType => lines.push(...generateScalarTypeDocumentation(scalarType)))

  lines.push('## Object Types')
  rootObjectTypes.forEach(rootObjectType => lines.push(...generateRootObjectTypeDocumentation(rootObjectType, typeMap)))

  lines.push('## Enum Types')
  enumTypes.forEach(enumType => lines.push(...generateEnumTypeDocumentation(enumType)))

  return lines.join('\n\n')
}
