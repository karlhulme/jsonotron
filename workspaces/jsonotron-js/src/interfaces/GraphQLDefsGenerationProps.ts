/**
 * Encapsulates the options that can be applied when
 * generating GraphQL type definitions.
 */
export interface GraphQLDefsGenerationProps {
  /**
   * True if the EnumType and EnumTypeItem type definitions
   * should be included in the GraphQL output.
   */
  includeEnumTypes?: boolean

  /**
   * True if the `scalar JSON` declaration should be included
   * in the GraphQL output.
   */
  includeJsonScalar?: boolean
}
