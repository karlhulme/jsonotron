import { EnumType } from 'jsonotron-interfaces'
import { snakeCase } from 'lodash'
import { ensureInitialCharacter } from '../utils'

export function generateEnumTypeResolvers (enumTypes: EnumType[]): string[] {
  return enumTypes
    .map(e => {
      const resolverLines = e.items.map(item => {
        return `  ${ensureInitialCharacter(snakeCase(item.value).toUpperCase())}: '${item.value}'`
      })

      const docBlock = `/**\n * A resolver for the ${e.name} enum.\n */\n`
      return `${docBlock}export const ${e.name}Resolver = {\n${resolverLines.join(',\n')}\n}`
    })
}
