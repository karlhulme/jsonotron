import { EnumType } from 'jsonotron-interfaces'

export function generateEnumTypeDocumentation (enumType: EnumType): string {
  return `
### ${enumType.name}

**kind**: enum\\
**system**: ${enumType.system}\\
**name**: ${enumType.name}\\

${enumType.documentation}

Value | Symbol | Text | Data | Documentation
--- | --- | --- | --- | ---
${enumType.items
.map(item => `${item.value} | ${item.symbol || ''} | ${item.text} | ${item.data ? '`' + JSON.stringify(item.data) + '`' : ''}  | ${item.deprecated ? '*Deprecated: ' + item.deprecated + '*<br />' : ''} ${item.documentation || ''}`)
.join('\n')
}

`
}
