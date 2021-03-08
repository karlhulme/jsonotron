import { EnumType, SchemaType, TypeMap } from 'jsonotron-interfaces'
import { convertJsonotronTypesToTypeMap } from '../typeMap'
import { wrapArrayIndicators, capitaliseInitialLetters } from '../utils'
import { CodeGenerationParameters } from './CodeGenerationParameters'
import { CodeGenerator } from './CodeGenerator'

export class GraphQLCodeGenerator implements CodeGenerator {
  generate (params: CodeGenerationParameters): string {
    const code = [
      this.generateStandardCode(),
      this.generateUnnamespacedCode(params.enumTypes, params.schemaTypes)
    ]

    return code.join('\n\n')
  }

  private generateStandardCode (): string {
    return `"""\nRepresents an enum type item \n"""\n` +
    `type EnumTypeItem {\n` +
    `  """\n  The underlying value of the item.\n  """\n  value: String!\n\n` +
    `  """\n  The display text of the value in English.\n  """\n  value: String!\n\n` +
    `  """\n  The documentation associated with this item.\n  """\n  documentation: String\n\n` +
    `  """\n  If populated, this value explains why the value was deprecated and/or which item to use instead.\n  """\n  deprecated: String\n\n` +
    `  """\n  A symbol associated with the item.\n  """\n  symbol: String\n\n` +
    `}`
  }

  private generateUnnamespacedCode (enumTypes: EnumType[], schemaTypes: SchemaType[]): string {
    const lines: string[] = [
      ...this.generateTypesForSchemaTypeObjects(enumTypes, schemaTypes)
    ]

    return lines.join('\n\n')
  }

  private generateTypesForSchemaTypeObjects (enumTypes: EnumType[], schemaTypes: SchemaType[]): string[] {
    const typeMap = convertJsonotronTypesToTypeMap(enumTypes, schemaTypes)

    return typeMap.objectTypes
      .map(t => {
        const propLinesFunc = (honourIsRequiredFlag: boolean) => {
          return t.properties.map(p => {
            const docBlock = p.documentation ? `  """\n  ${p.documentation}\n  """\n` : ''
            const resolvedType = this.resolveJsonotronTypeToGraphQLType(p.refTypeName, 0, typeMap)
            const reqMark = p.isRequired && honourIsRequiredFlag ? '!' : ''
            return `${docBlock}  ${p.propertyName}: ${resolvedType}${reqMark}`
          })
        }

        const docBlock = `"""\n${t.documentation}\n"""\n`
        return `${docBlock}type ${this.convertJsonotronTypeNameToGraphQLTypeName(t.name)} {\n${propLinesFunc(true).join('\n\n')}\n}\n\n` +
          `${docBlock}type ${this.convertJsonotronTypeNameToGraphQLTypeName(t.name)}Editing {\n${propLinesFunc(false).join('\n\n')}\n}\n\n`
      })
  }

  private resolveJsonotronTypeToGraphQLType (fqnTypeName: string, arrayCount: number, map: TypeMap): string {
    const matchedRefType = map.refTypes.find(t => t.name === fqnTypeName)
  
    // we matched a ref type, if it's a scalar we can return that type
    // otherwise we need to repeat the search using the new (resolved) type name.
    if (matchedRefType) {
      if (matchedRefType.isScalarRef) {
        return wrapArrayIndicators(arrayCount + matchedRefType.refTypeArrayCount, this.convertJsonotronScalarNameToGraphQLScalarName(matchedRefType.refTypeName))
      } else {
        return this.resolveJsonotronTypeToGraphQLType(matchedRefType.refTypeName, arrayCount + matchedRefType.refTypeArrayCount, map)
      }
    }
  
    const matchedObjectType = map.objectTypes.find(t => t.name === fqnTypeName)

    // we matched an object type, so we need to return it but apply formatting.
    /* istanbul ignore else */
    if (matchedObjectType) {
      return wrapArrayIndicators(arrayCount + matchedObjectType.objectTypeArrayCount, this.convertJsonotronTypeNameToGraphQLTypeName(matchedObjectType.name))
    } else {
      // we failed to resolve the type name
      return 'JSON'
    }
  }

  private convertJsonotronScalarNameToGraphQLScalarName (scalarName: string): string {
    if (scalarName === 'boolean') {
      return 'Boolean'
    } else if (scalarName === 'number') {
      return 'Float'
    } else if (scalarName === 'integer') {
      return 'Int'
    } else if (scalarName === 'string') {
      return 'String'
    } else {
      return 'JSON'
    }
  }

  private convertJsonotronTypeNameToGraphQLTypeName (fqn: string): string {
    const slashIndex = fqn.lastIndexOf('/')
    return capitaliseInitialLetters(fqn.slice(slashIndex + 1))
  }
}
