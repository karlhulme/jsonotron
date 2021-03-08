import { EnumType, SchemaType, TypeMap } from 'jsonotron-interfaces'
import { convertJsonotronTypesToTypeMap } from '../typeMap'
import { appendArrayIndicators, capitaliseInitialLetters, ensureInitialCharacter, ensureValidCodePropertyCharacters, escapeQuotes } from '../utils'
import { CodeGenerationParameters } from './CodeGenerationParameters'
import { CodeGenerator } from './CodeGenerator'
import { getUniqueSystemRefs } from './getUniqueSystemRefs'

export class TypescriptCodeGenerator implements CodeGenerator {
  generate (params: CodeGenerationParameters): string {
    const code = [
      this.generateStandardCode(),
      this.generateSystemCentricCode(params.enumTypes, params.schemaTypes),
      this.generateUnnamespacedCode(params.enumTypes, params.schemaTypes)
    ]

    return code.join('\n\n')
  }

  private generateStandardCode (): string {
    return `/**\n * Represents an item in an enumeration.\n */\n` +
      `export interface EnumTypeItem {\n` +
      `  /**\n   * The underlying value of the item.\n   */\n  value: string\n\n` +
      `  /**\n   * The display text of the value in English.\n   */\n  text: string\n\n` +
      `  /**\n   * The documentation associated with this item.\n   */\n  documentation?: string\n\n` +
      `  /**\n   * If populated, this value explains why the value was deprecated and/or which item to use instead.\n   */\n  deprecated?: string\n\n` +
      `  /**\n   * A symbol associated with the item.\n   */\n  symbol?: string\n` +
      `}`
  }

  private generateSystemCentricCode (enumTypes: EnumType[], schemaTypes: SchemaType[]): string {
    const lines: string[] = []

    const uniqueSystemRefs = getUniqueSystemRefs(enumTypes, schemaTypes)

    for (const uniqueSystemRef of uniqueSystemRefs) {
      const systemEnumTypes = enumTypes
        .filter(e => `${e.domain}/${e.system}` === uniqueSystemRef.domainSystem)

      const systemSchemaTypes = schemaTypes
        .filter(s => `${s.domain}/${s.system}` === uniqueSystemRef.domainSystem)

      const systemLines = [
        ...this.generateSystemCentricTypeNames(systemEnumTypes, systemSchemaTypes),
        ...this.generateSystemCentricEnumValues(systemEnumTypes),
        ...this.generateSystemCentricEnumItems(systemEnumTypes)
      ]

      const docBlock = `/**\n * The types of the ${uniqueSystemRef.domainSystem} system.\n */`
      const code = `${docBlock}\nexport const ${uniqueSystemRef.system} = {\n${systemLines.join(',\n\n')}\n}`

      lines.push(code)
    }

    return lines.join('\n\n')
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
        return `${docBlock}\n  ${e.name}Values: {\n${valueLines.join(',\n\n')}\n  }`
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
        return `${docBlock}  ${e.name}Items: [\n${itemLines.join(',\n')}\n  ] as EnumTypeItem[]`
      })
  }

  private generateUnnamespacedCode (enumTypes: EnumType[], schemaTypes: SchemaType[]): string {
    const lines: string[] = [
      ...this.generateInterfacesForSchemaTypeObjects(enumTypes, schemaTypes)
    ]

    return lines.join('\n\n')
  }

  private generateInterfacesForSchemaTypeObjects (enumTypes: EnumType[], schemaTypes: SchemaType[]): string[] {
    const typeMap = convertJsonotronTypesToTypeMap(enumTypes, schemaTypes)

    return typeMap.objectTypes
      .map(t => {
        const propLines = t.properties.map(p => {
          const docBlock = p.documentation ? `  /**\n   * ${p.documentation}\n   */\n` : ''
          const resolvedType = this.resolveJsonotronTypeToTypescriptType(p.refTypeName, 0, typeMap)
          const nullableMark = p.isRequired ? '' : '?'
          return `${docBlock}  ${p.propertyName}${nullableMark}: ${resolvedType}`
        })

        const docBlock = `/**\n * ${t.documentation}\n */\n`
        return `${docBlock}export interface ${this.convertJsonotronTypeNameToTypescriptInterfaceName(t.name)} {\n${propLines.join('\n\n')}\n}`
      })
  }

  private resolveJsonotronTypeToTypescriptType (fqnTypeName: string, arrayCount: number, map: TypeMap): string {
    const matchedRefType = map.refTypes.find(t => t.name === fqnTypeName)
  
    // we matched a ref type, if it's a scalar we can return that type
    // otherwise we need to repeat the search using the new (resolved) type name.
    if (matchedRefType) {
      if (matchedRefType.isScalarRef) {
        return appendArrayIndicators(arrayCount + matchedRefType.refTypeArrayCount, this.convertJsonotronScalarNameToTypescriptScalarName(matchedRefType.refTypeName))
      } else {
        return this.resolveJsonotronTypeToTypescriptType(matchedRefType.refTypeName, arrayCount + matchedRefType.refTypeArrayCount, map)
      }
    }
  
    const matchedObjectType = map.objectTypes.find(t => t.name === fqnTypeName)

    // we matched an object type, so we need to return it but apply formatting.
    /* istanbul ignore else */
    if (matchedObjectType) {
      return appendArrayIndicators(arrayCount + matchedObjectType.objectTypeArrayCount, this.convertJsonotronTypeNameToTypescriptInterfaceName(matchedObjectType.name))
    } else {
      // we failed to resolve the type name
      return 'unknown'
    }
  }

  private convertJsonotronScalarNameToTypescriptScalarName (scalarName: string): string {
    if (scalarName === 'boolean') {
      return 'boolean'
    } else if (scalarName === 'number' || scalarName === 'integer') {
      return 'number'
    } else if (scalarName === 'string') {
      return 'string'
    } else {
      return 'Record<string, unknown>'
    }
  }
  
  private convertJsonotronTypeNameToTypescriptInterfaceName (fqn: string): string {
    const slashIndex = fqn.lastIndexOf('/')
    return capitaliseInitialLetters(fqn.slice(slashIndex + 1))
  }
}
