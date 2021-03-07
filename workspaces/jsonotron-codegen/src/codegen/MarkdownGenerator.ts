import { EnumType, SchemaType } from 'jsonotron-interfaces'
import { CodeGenerationParameters } from './CodeGenerationParameters'
import { CodeGenerator } from './CodeGenerator'
import { getUniqueSystemRefs, SystemRef } from './getUniqueSystemRefs'

export class MarkdownGenerator implements CodeGenerator {
  generate (params: CodeGenerationParameters): string {
    const lines: string[] = []

    lines.push(`# Type Systems`)

    const uniqueSystemRefs = getUniqueSystemRefs(params.enumTypes, params.schemaTypes)

    lines.push(uniqueSystemRefs.map(usr => `* ["${usr.system}" System of ${usr.domainSystem}](#"${usr.system}"-System)`).join('\n'))

    for (const uniqueSystemRef of uniqueSystemRefs) {
      const systemEnumTypes = params.enumTypes
        .filter(e => `${e.domain}/${e.system}` === uniqueSystemRef.domainSystem)

      const systemSchemaTypes = params.schemaTypes
        .filter(s => `${s.domain}/${s.system}` === uniqueSystemRef.domainSystem)

      const systemMarkdown = this.generateSystemCentricMarkdown(uniqueSystemRef, systemEnumTypes, systemSchemaTypes)

      lines.push(systemMarkdown)
    }

    return lines.join('\n\n')
  }

  private generateSystemCentricMarkdown (systemRef: SystemRef, enumTypes: EnumType[], schemaTypes: SchemaType[]): string {
    const allTypes = [
      ...enumTypes.map(e => ({ name: e.name, enumType: e, schemaType: null })),
      ...schemaTypes.map(s => ({ name: s.name, enumType: null, schemaType: s }))
    ]

    return `
## "${systemRef.system}" System

The types of the \`${systemRef.domain}/${systemRef.system}\` system.

${this.generateSystemContents(enumTypes, schemaTypes)}

${allTypes
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(t => t.enumType
    ? this.generateEnumTypeDocumentation(t.enumType)
    : t.schemaType
      ? this.generateSchemaTypeDocumentation(t.schemaType)
      /* istanbul ignore next - either enum or schema will be provided  */
      : '')
  .join('\n')
}
      `
  }

  private generateSystemContents (enumTypes: EnumType[], schemaTypes: SchemaType[]): string {
    return `
${enumTypes.length > 0 ? '### Enum Types' : ''}

${enumTypes
  .sort((a, b) => a.title.localeCompare(b.title))
  .map(enumType => `* [${enumType.title}](#${enumType.title.toLocaleLowerCase().replace(/ /g, '-')})`)
  .join('\n')
}

${schemaTypes.length > 0 ? '### Schema Types' : ''}

${schemaTypes
  .sort((a, b) => a.title.localeCompare(b.title))
  .map(schemaType => `* [${schemaType.title}](#${schemaType.title.toLocaleLowerCase().replace(/ /g, '-')})`)
  .join('\n')
}
`
  }

  private generateEnumTypeDocumentation (enumType: EnumType): string {
    return `
### ${enumType.title}

**kind**: enum\\
**name**: ${enumType.name}\\
**uri**: ${enumType.domain}/${enumType.system}/${enumType.name}

${enumType.documentation}

Value | Symbol | Text | Documentation
--- | --- | --- | ---
${enumType.items
  .map(item => `${item.value} | ${item.symbol || ''} | ${item.text} | ${item.deprecated ? '*Deprecated: ' + item.deprecated + '*<br />' : ''} ${item.documentation || ''}`)
  .join('\n')
}

  `
  }

  private generateSchemaTypeDocumentation (schemaType: SchemaType): string {
    return `
### ${schemaType.title}

**kind**: schema\\
**name**: ${schemaType.name}\\
**uri**: ${schemaType.domain}/${schemaType.system}/${schemaType.name}

${schemaType.documentation}

${schemaType.examples
  .map((example, index) => {
    return `#### Example ${index + 1}\n\n` +
      example.documentation + '\n\n' +
      '```json\n' +
      JSON.stringify(example.value, null, 2) + '\n' +
      '```\n'
    })
  .join('\n')
}

${`#### Schema\n\n\n` + '```json\n' + JSON.stringify(schemaType.jsonSchema, null, 2) + '\n```\n'}
`
  }
}

