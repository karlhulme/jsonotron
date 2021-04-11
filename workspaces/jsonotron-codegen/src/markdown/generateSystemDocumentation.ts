import { EnumType, SchemaType } from 'jsonotron-interfaces'
import { generateEnumTypeDocumentation } from './generateEnumTypeDocumentation'
import { generateSchemaTypeDocumentation } from './generateSchemaTypeDocumentation'
import { generateSystemContents } from './generateSystemContents'

export function generateSystemDocumentation (system: string, enumTypes: EnumType[], schemaTypes: SchemaType[]): string {
  const allTypes = [
    ...enumTypes.map(e => ({ name: e.name, enumType: e, schemaType: null })),
    ...schemaTypes.map(s => ({ name: s.name, enumType: null, schemaType: s }))
  ]

  return `
## "${system}" System

The types of the \`${system}\` system.

${generateSystemContents(enumTypes, schemaTypes)}

${allTypes
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(t => t.enumType
    ? generateEnumTypeDocumentation(t.enumType)
    : t.schemaType
      ? generateSchemaTypeDocumentation(t.schemaType)
      /* istanbul ignore next - either enum or schema will be provided  */
      : '')
  .join('\n')
}
    `
}
