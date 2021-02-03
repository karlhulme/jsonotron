import { EnumType } from '../interfaces'
import { escapeStr } from '../utils'

/**
 * Generates a string containing enum types in typescript.
 * @param enumTypes An array of enum types.
 */
export function generateTypescriptEnums (enumTypes: EnumType[]): string {
  const enumTypeItemString = `/**\n * Represents an item in an enumeration.\n */\n` +
    `export interface EnumTypeItem {\n` +
    `  /**\n   * The underlying value of the item.\n   */\n  value: string\n\n` +
    `  /**\n   * The display text of the value in English.\n   */\n  text: string\n\n` +
    `  /**\n   * If populated, this value explains why the value was deprecated and/or which item to use instead.\n   */\n  deprecated?: string\n\n` +
    `  /**\n   * A symbol associated with the item.\n   */\n  symbol?: string\n` +
    `}\n\n`

  const enumsString = enumTypes
    .map(e => {
      const itemLines = e.items.map(item => {
        const documentation = item.documentation ? `  /**\n   * ${item.documentation}\n   */\n` : ''
        const deprecated = item.deprecated ? `, deprecated: '${escapeStr(item.deprecated)}'` : ''
        const symbol = item.symbol ? `, symbol: '${escapeStr(item.symbol)}'` : ''
        return `${documentation}  { value: '${item.value}', text: '${escapeStr(item.text)}'${deprecated}${symbol} }`
      })

      const docBlock = `/**\n * ${e.documentation}\n */\n`
      return `${docBlock}export const ${e.name}Items: EnumTypeItem[] = [\n${itemLines.join(',\n\n')}\n]\n`
    })
    .join('\n')

  return enumTypeItemString + enumsString
}
