import { EnumType, SchemaType } from 'jsonotron-interfaces'

export function generateSystemContents (enumTypes: EnumType[], schemaTypes: SchemaType[]): string {
  return `
${enumTypes.length > 0 ? '### Enum Types' : ''}

${enumTypes
.sort((a, b) => a.name.localeCompare(b.name))
.map(enumType => `* [${enumType.name}](#${enumType.name})`)
.join('\n')
}

${schemaTypes.length > 0 ? '### Schema Types' : ''}

${schemaTypes
.sort((a, b) => a.name.localeCompare(b.name))
.map(schemaType => `* [${schemaType.name}](#${schemaType.name})`)
.join('\n')
}
`
}
