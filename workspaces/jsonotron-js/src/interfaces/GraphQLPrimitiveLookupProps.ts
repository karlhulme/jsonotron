/**
 * Encapsulates the properties of the function for
 * looking up the equivalent GraphQL type for an
 * enum or schema type.
 */
export interface GraphQLPrimitiveLookupProps {
  typeName: string
  isArray?: boolean
  isRequired?: boolean
}
