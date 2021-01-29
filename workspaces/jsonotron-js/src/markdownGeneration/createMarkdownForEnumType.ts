import { EnumType } from '../interfaces'

/**
 * Creates markdown documentation for the given enum type.
 * @param enumType An enum type.
 */
export function createMarkdownForEnumType (enumType: EnumType): string {
  return `
## ${enumType.title}

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
