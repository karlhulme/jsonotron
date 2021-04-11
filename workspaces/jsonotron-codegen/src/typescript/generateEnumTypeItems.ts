import { EnumType } from 'jsonotron-interfaces'
import { capitaliseInitialLetters, escapeQuotes } from '../utils'

export function generateEnumTypeItems (enumTypes: EnumType[]): string[] {
  return enumTypes
    .map(e => {
      const itemLines = e.items.map(item => {
        const documentation = item.documentation ? `, documentation: '${escapeQuotes(item.documentation)}'` : ''
        const deprecated = item.deprecated ? `, deprecated: '${escapeQuotes(item.deprecated)}'` : ''
        const symbol = item.symbol ? `, symbol: '${escapeQuotes(item.symbol)}'` : ''
        const data = e.dataJsonSchema ? `, data: ${JSON.stringify(item.data)}` : ''
        return `  { value: '${item.value}', text: '${escapeQuotes(item.text)}'${documentation}${deprecated}${symbol}${data} }`
      })

      const docBlock = `/**\n * ${e.documentation}\n */\n`
      const typeCast = e.dataJsonSchema
        ? `ExtendedEnumTypeItem<${capitaliseInitialLetters(e.name)}_Data>[]`
        : `EnumTypeItem[]`
  
      return `${docBlock}export const ${e.name}Items = [\n${itemLines.join(',\n')}\n] as ${typeCast}`
    })
}
