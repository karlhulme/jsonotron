import { EnumType } from 'jsonotron-interfaces'
import { camelToSnakeCase, escapeStr } from '../utils'

/**
 * Prefixes an underscore to the given value if the first
 * character is not a letter, otherwise returns the value unchanged.
 * @param value The value to check.
 */
function ensureInitialCharacter (value: string) {
  return (/^[a-zA-Z]/.test(value))
    ? value
    : '_' + value
}

/**
 * Returns the given value but any characters that are not valid
 * in a typescript property name converted to an underscore.
 * @param value The value to check.
 */
function ensureValidTypescriptPropertyCharacters (value: string) {
  return value.replace(/[^a-zA-Z0-9]/g, '_')
}

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

  const enumItemsString = enumTypes
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

  const enumConstsString = enumTypes
    .map(e => {
      const valueLines = e.items.map(item => {
        const documentation = item.documentation ? `  /**\n   * ${item.documentation}\n   */\n` : ''
        return `${documentation}  ${ensureInitialCharacter(ensureValidTypescriptPropertyCharacters(item.value))}: '${item.value}'`
      })

      const docBlock = `/**\n * ${e.documentation}\n */\n`
      return `${docBlock}export const ${camelToSnakeCase(e.name).toUpperCase()}_VALUES = {\n${valueLines.join(',\n\n')}\n}\n`
    })
    .join('\n')

  return enumTypeItemString + enumItemsString + enumConstsString
}
