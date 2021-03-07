import { EnumType, SchemaType } from 'jsonotron-interfaces'
import { ensureInitialCharacter, ensureValidCodePropertyCharacters } from '../utils'
import { escapeQuotes } from '../utils/escapeQuotes'
import { CodeGenerator, GenerateCodeParameters } from './CodeGenerator'
import { JsonoserveTypes } from './fetchTypes'

export class TypescriptCodeGenerator implements CodeGenerator {
  generate (params: GenerateCodeParameters): string {
    const code = [
      this.generateStandardCode(),
      this.generateSystemCentricCode(params.types)
    ]

    return code.join('\n\n')
  }

  private generateStandardCode (): string {
    return `/**\n * Represents an item in an enumeration.\n */\n` +
      `export interface EnumTypeItem {\n` +
      `  /**\n   * The underlying value of the item.\n   */\n  value: string\n\n` +
      `  /**\n   * The display text of the value in English.\n   */\n  text: string\n\n` +
      `  /**\n   * If populated, this value explains why the value was deprecated and/or which item to use instead.\n   */\n  deprecated?: string\n\n` +
      `  /**\n   * A symbol associated with the item.\n   */\n  symbol?: string\n` +
      `}`
  }

  private generateSystemCentricCode (types: JsonoserveTypes): string {
    const lines: string[] = []

    const uniqueSystemRefs = this.getUniqueSystemRefs(types)

    for (const uniqueSystem of uniqueSystemRefs) {
      const enumTypes = types.enumTypes
        .filter(e => `${e.domain}/${e.system}` === uniqueSystem.domainSystem)

      const schemaTypes = types.schemaTypes
        .filter(s => `${s.domain}/${s.system}` === uniqueSystem.domainSystem)

      const combined = [
        ...this.generateSystemCentricTypeNames(enumTypes, schemaTypes),
        ...this.generateSystemCentricEnumValues(enumTypes),
        ...this.generateSystemCentricEnumItems(enumTypes)
      ]

      const docBlock = `/**\n * The types of the ${uniqueSystem.domainSystem} system.\n */`
      const code = `${docBlock}\nexport const ${uniqueSystem.system} = {\n${combined.join(',\n\n')}\n}`

      lines.push(code)
    }

    return lines.join('\n\n')
  }

  private getUniqueSystemRefs (types: JsonoserveTypes) {
    const systemRefs = [
      ...types.enumTypes.map(e => ({ domain: e.domain, system: e.system, domainSystem: `${e.domain}/${e.system}` })),
      ...types.schemaTypes.map(s => ({ domain: s.domain, system: s.system, domainSystem: `${s.domain}/${s.system}` }))
    ]

    const uniqueSystemRefs: { domain: string, system: string, domainSystem: string }[] = []

    for (const systemRef of systemRefs) {
      if (uniqueSystemRefs.findIndex(u => u.domainSystem === systemRef.domainSystem) === -1) {
        uniqueSystemRefs.push(systemRef)
      }
    }

    return uniqueSystemRefs
  }

  private generateSystemCentricTypeNames (enumTypes: EnumType[], schemaTypes: SchemaType[]): string[] {
    const enumTypeNames = enumTypes
      .map(e => `  /**\n   * The qualified name of the ${e.name} type. \n   */\n  ${e.name}: '${e.domain}/${e.system}/${e.name}'`)

    const schemaTypeNames = schemaTypes
      .map(s => `  /**\n   * The qualified name of the ${s.name} type. \n   */\n  ${s.name}: '${s.domain}/${s.system}/${s.name}'`)

    return [
      ...enumTypeNames,
      ...schemaTypeNames
    ]
  }

  private generateSystemCentricEnumValues (enumTypes: EnumType[]): string[] {
    return enumTypes
      .map(e => {
        const valueLines = e.items.map(item => {
          const documentation = item.documentation ? `    /**\n     * ${item.documentation}\n     */\n` : ''
          return `${documentation}    ${ensureInitialCharacter(ensureValidCodePropertyCharacters(item.value))}: '${item.value}'`
        })

        const docBlock = `  /**\n   * ${e.documentation}\n   */`
        return `${docBlock}\n  ${e.name}Values = {\n${valueLines.join(',\n\n')}\n  }`
      })
  }

  private generateSystemCentricEnumItems (enumTypes: EnumType[]): string[] {
    return enumTypes
      .map(e => {
        const itemLines = e.items.map(item => {
          const documentation = item.documentation ? `, documentation: '${escapeQuotes(item.documentation)}'` : ''
          const deprecated = item.deprecated ? `, deprecated: '${escapeQuotes(item.deprecated)}'` : ''
          const symbol = item.symbol ? `, symbol: '${escapeQuotes(item.symbol)}'` : ''
          return `    { value: '${item.value}', text: '${escapeQuotes(item.text)}'${documentation}${deprecated}${symbol} }`
        })

        const docBlock = `  /**\n   * ${e.documentation}\n   */\n`
        return `${docBlock}  ${e.name}Items: EnumTypeItem[] = [\n${itemLines.join(',\n')}\n  ]`
      })
  }
}
