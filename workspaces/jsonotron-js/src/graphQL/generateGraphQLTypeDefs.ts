import { GraphQLDefsGenerationProps, GraphQLMap } from '../interfaces';
import { convertJsonotronTypeNameToGraphQLTypeName } from './convertJsonotronTypeNameToGraphQLTypeName';
import { EnumGraphQLTypes } from './EnumGraphQLTypes';
import { resolveJsonotronTypeToGraphQLType } from './resolveJsonotronTypeToGraphQLType';

/**
 * Generates a GraphQL type definitions string.
 * @param map A GraphQL map.
 * @param props The properties that govern the GraphQL generation.
 */
export function generateGraphQLTypeDefs (map: GraphQLMap, props: GraphQLDefsGenerationProps): string {
  const typesString = map.objectTypes
    .map(t => {
      const propLines = t.properties.map(p => {
        const docBlock = p.documentation ? `  "${p.documentation}"\n` : ''
        const resolvedType = resolveJsonotronTypeToGraphQLType(p.refTypeName, 0, map, false)
        const requiredFlag = p.isRequired ? '!' : ''
        return `${docBlock}  ${p.propertyName}: ${resolvedType}${requiredFlag}`
      })

      const docBlock = `"""\n${t.documentation}\n"""\n`
      return `${docBlock}type ${convertJsonotronTypeNameToGraphQLTypeName(t.name, false)} {\n${propLines.join('\n\n')}\n}\n`
    })
    .join('\n')

  const inputsString = map.objectTypes
    .map(t => {
      const propLines = t.properties.map(p => {
        const docBlock = p.documentation ? `  "${p.documentation}"\n` : ''
        const resolvedType = resolveJsonotronTypeToGraphQLType(p.refTypeName, 0, map, true)
        const requiredFlag = p.isRequired ? '!' : ''
        return `${docBlock}  ${p.propertyName}: ${resolvedType}${requiredFlag}`
      })

      const docBlock = `"""\n${t.documentation}\n"""\n`
      return `${docBlock}input ${convertJsonotronTypeNameToGraphQLTypeName(t.name, true)} {\n${propLines.join('\n\n')}\n}\n`
    })
    .join('\n')

  const gql = `
  ${props.includeJsonScalar ? 'scalar JSON' : ''}

  ${props.includeEnumTypes ? EnumGraphQLTypes : ''}

  ${typesString}

  ${inputsString}
`

  return gql
}
