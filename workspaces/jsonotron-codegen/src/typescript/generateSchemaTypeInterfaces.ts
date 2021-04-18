import { EnumType, SchemaType, TypeMap, TypeMapObject } from 'jsonotron-interfaces'
import { convertJsonotronTypesToTypeMap } from '../typeMap'
import { appendArrayIndicators, capitaliseInitialLetters } from '../utils'

export function generateSchemaTypeInterfaces (enumTypes: EnumType[], schemaTypes: SchemaType[]): string[] {
  const typeMap = convertJsonotronTypesToTypeMap({ enumTypes, schemaTypes })

  return typeMap.objectTypes
    .map(t => {
      const propLines = t.properties.map(p => {
        const docBlock = p.documentation ? `  /**\n   * ${p.documentation}\n   */\n` : ''
        const resolvedType = resolveJsonotronTypeToTypescriptType(p.refTypeName, 0, typeMap)
        const nullableMark = p.isRequired ? '' : '?'
        return `${docBlock}  ${p.propertyName}${nullableMark}: ${resolvedType}`
      })

      const docBlock = `/**\n * ${t.documentation}\n */\n`

      return `${docBlock}export interface ${convertJsonotronTypeNameToTypescriptInterfaceName(t)} {\n${propLines.join('\n\n')}\n}`
    })
}

function resolveJsonotronTypeToTypescriptType (fqn: string, arrayCount: number, map: TypeMap): string {
  const matchedRefType = map.refTypes.find(t => `${t.system}/${t.name}` === fqn)

  // we matched a ref type, if it's a scalar we can return that type
  // otherwise we need to repeat the search using the new (resolved) type name.
  if (matchedRefType) {
    if (matchedRefType.isScalarRef || matchedRefType.isEnumRef) {
      return appendArrayIndicators(arrayCount + matchedRefType.refTypeArrayCount, convertJsonotronScalarNameToTypescriptScalarName(matchedRefType.refTypeName))
    } else {
      return resolveJsonotronTypeToTypescriptType(matchedRefType.refTypeName, arrayCount + matchedRefType.refTypeArrayCount, map)
    }
  }

  const matchedObjectType = map.objectTypes.find(t => `${t.system}/${t.name}` === fqn)

  // we matched an object type, so we need to return it but apply formatting.
  /* istanbul ignore else */
  if (matchedObjectType) {
    return appendArrayIndicators(arrayCount + matchedObjectType.objectTypeArrayCount, convertJsonotronTypeNameToTypescriptInterfaceName(matchedObjectType))
  } else {
    // we failed to resolve the type name
    return 'unknown'
  }
}

function convertJsonotronScalarNameToTypescriptScalarName (scalarName: string): string {
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

function convertJsonotronTypeNameToTypescriptInterfaceName (obj: TypeMapObject): string {
  return capitaliseInitialLetters(obj.name)
}
