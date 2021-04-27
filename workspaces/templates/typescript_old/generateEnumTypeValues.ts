import { EnumType } from 'jsonotron-interfaces'
import { ensureInitialCharacter, ensureValidCodePropertyCharacters } from '../utils'

export function generateEnumTypeValues (enumTypes: EnumType[]): string[] {
  return enumTypes
    .map(e => {
      const valueLines = e.items.map(item => {
        const documentation = item.documentation ? `  /**\n   * ${item.documentation}\n   */\n` : ''
        return `${documentation}  ${ensureInitialCharacter(ensureValidCodePropertyCharacters(item.value))}: '${item.value}'`
      })

      const docBlock = `/**\n * ${e.documentation}\n */`
      return `${docBlock}\nexport const ${e.name}Values = {\n${valueLines.join(',\n\n')}\n}`
    })
}
