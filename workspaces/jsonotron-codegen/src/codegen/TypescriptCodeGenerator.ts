import { snakeCase } from 'lodash'
import { EnumType, SchemaType, TypeMap, TypeMapObject } from 'jsonotron-interfaces'
import { convertJsonotronTypesToTypeMap } from '../typeMap'
import { appendArrayIndicators, capitaliseInitialLetters, ensureInitialCharacter, ensureValidCodePropertyCharacters, escapeQuotes } from '../utils'
import { CodeGenerationParameters } from './CodeGenerationParameters'
import { CodeGenerator } from './CodeGenerator'
import { getUniqueSystemRefs } from './getUniqueSystemRefs'

export class TypescriptCodeGenerator implements CodeGenerator {
  generate (params: CodeGenerationParameters): string {
    const code = [
      ...this.generateStandardCode(),
      ...this.generateTypeNameConstants(params.enumTypes, params.schemaTypes),
      ...this.generateEnumTypeValues(params.enumTypes),
      ...this.generateEnumTypeItems(params.enumTypes),
      ...this.generateEnumTypeResolvers(params.enumTypes),
      ...this.generateInterfacesForSchemaTypeObjects(params.enumTypes, params.schemaTypes)
    ]

    return code.join('\n\n')
  }

  private generateStandardCode (): string[] {
    return [`
/**
 * Represents an item in an enumeration.
 */
export interface EnumTypeItem {
  /**
   * The underlying value of the item.
   */
  value: string
  
  /**
   * The display text of the value in English.
   */
  text: string

  /**
   * The documentation associated with this item.
   */
  documentation?: string
  
  /**
   * If populated, this value explains why the value was deprecated and/or which item to use instead.
   */
  deprecated?: string
  
  /**
   * A symbol associated with the item
   */
  symbol?: string
}

export interface ExtendedEnumTypeItem<T> extends EnumTypeItem {
  data: T
}
`]
  }

  private generateTypeNameConstants (enumTypes: EnumType[], schemaTypes: SchemaType[]): string[] {
    const lines: string[] = []

    const uniqueSystemRefs = getUniqueSystemRefs(enumTypes, schemaTypes)

    for (const uniqueSystemRef of uniqueSystemRefs) {
      const systemEnumTypes = enumTypes
        .filter(e => `${e.domain}/${e.system}` === uniqueSystemRef.domainSystem)

      const systemSchemaTypes = schemaTypes
        .filter(s => `${s.domain}/${s.system}` === uniqueSystemRef.domainSystem)

      const enumTypeNameConstants = systemEnumTypes
        .map(e => `  /**\n   * The fully qualified name of the ${e.name} type. \n   */\n  ${e.name}: '${e.domain}/${e.system}/${e.name}'`)

      const schemaTypeNameConstants = systemSchemaTypes
        .map(s => `  /**\n   * The fully qualified name of the ${s.name} type. \n   */\n  ${s.name}: '${s.domain}/${s.system}/${s.name}'`)

      const typeNameConstants = [
        ...enumTypeNameConstants,
        ...schemaTypeNameConstants
      ]

      const docBlock = `/**\n * The types of the ${uniqueSystemRef.domainSystem} system.\n */`
      const code = `${docBlock}\nexport const ${uniqueSystemRef.system.toUpperCase()} = {\n${typeNameConstants.join(',\n\n')}\n}`

      lines.push(code)
    }

    return lines
  }

  private generateEnumTypeValues (enumTypes: EnumType[]): string[] {
    return enumTypes
      .map(e => {
        const valueLines = e.items.map(item => {
          const documentation = item.documentation ? `  /**\n   * ${item.documentation}\n   */\n` : ''
          return `${documentation}  ${ensureInitialCharacter(ensureValidCodePropertyCharacters(item.value))}: '${item.value}'`
        })

        const docBlock = `/**\n * ${e.documentation}\n */`
        return `${docBlock}\nexport const ${e.system.toUpperCase()}_${snakeCase(e.name).toUpperCase()}_VALUES = {\n${valueLines.join(',\n\n')}\n}`
      })
  }

  private generateEnumTypeItems (enumTypes: EnumType[]): string[] {
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
          ? `ExtendedEnumTypeItem<${capitaliseInitialLetters(e.system)}${capitaliseInitialLetters(e.name)}_Data>[]`
          : `EnumTypeItem[]`
    
        return `${docBlock}export const ${e.system}${capitaliseInitialLetters(e.name)}Items = [\n${itemLines.join(',\n')}\n] as ${typeCast}`
      })
  }

  private generateEnumTypeResolvers (enumTypes: EnumType[]): string[] {
    return enumTypes
      .map(e => {
        const resolverLines = e.items.map(item => {
          return `  ${ensureInitialCharacter(snakeCase(item.value).toUpperCase())}: '${item.value}'`
        })

        const docBlock = `/**\n * A GraphQL resolver for the ${e.name} enum.\n */\n`
        return `${docBlock}export const ${e.system}${capitaliseInitialLetters(e.name)}Resolver = {\n${resolverLines.join(',\n')}\n}`
      })
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
        return `${docBlock}export interface ${this.convertJsonotronTypeNameToTypescriptInterfaceName(t)} {\n${propLines.join('\n\n')}\n}`
      })
  }

  private resolveJsonotronTypeToTypescriptType (fqn: string, arrayCount: number, map: TypeMap): string {
    const matchedRefType = map.refTypes.find(t => t.fullyQualifiedName === fqn)

    // we matched a ref type, if it's a scalar we can return that type
    // otherwise we need to repeat the search using the new (resolved) type name.
    if (matchedRefType) {
      if (matchedRefType.isScalarRef || matchedRefType.isEnumRef) {
        return appendArrayIndicators(arrayCount + matchedRefType.refTypeArrayCount, this.convertJsonotronScalarNameToTypescriptScalarName(matchedRefType.refTypeName))
      } else {
        return this.resolveJsonotronTypeToTypescriptType(matchedRefType.refTypeName, arrayCount + matchedRefType.refTypeArrayCount, map)
      }
    }
  
    const matchedObjectType = map.objectTypes.find(t => t.fullyQualifiedName === fqn)

    // we matched an object type, so we need to return it but apply formatting.
    /* istanbul ignore else */
    if (matchedObjectType) {
      return appendArrayIndicators(arrayCount + matchedObjectType.objectTypeArrayCount, this.convertJsonotronTypeNameToTypescriptInterfaceName(matchedObjectType))
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
  
  private convertJsonotronTypeNameToTypescriptInterfaceName (obj: TypeMapObject): string {
    return `${capitaliseInitialLetters(obj.system)}${capitaliseInitialLetters(obj.name)}`
  }
}
