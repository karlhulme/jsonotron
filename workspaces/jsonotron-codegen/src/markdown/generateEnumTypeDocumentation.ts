import { TypeMapRef } from 'jsonotron-interfaces'

export function generateEnumTypeDocumentation (enumType: TypeMapRef): string[] {
  const lines: string[] = []

  lines.push(`### \`${enumType.name}\``)

  lines.push(enumType.documentation || `The ${enumType.name} enum type.`)
  lines.push(`This type is defined in the ${enumType.system} system.`)

  if (enumType.enumItemDataTypeName) {
    lines.push(`Each item has additional data based on the [${enumType.enumItemDataTypeName}}](#${enumType.enumItemDataTypeName} object type.`)
  }

  lines.push(`
Value | Symbol | Text | Data | Description
--- | --- | --- | --- | ---
${enumType.enumItems?.map(item => `${item.value} | ${item.symbol || ''} | ${item.text} | ${item.data ? '`' + JSON.stringify(item.data) + '`' : ''}  | ${item.deprecated ? '*Deprecated: ' + item.deprecated + '*<br />' : ''} ${item.documentation || ''}`)
.join('\n')
}
  `)

  return lines
}
