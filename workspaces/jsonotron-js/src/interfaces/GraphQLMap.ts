import { GraphQLObjectType } from './GraphQLObjectType'
import { GraphQLRefType } from './GraphQLRefType'

/**
 * Represents a map of a GraphQL system built from
 * one or more Jsonotron type systems.
 */
export interface GraphQLMap {
  /**
   * An array of the object types that consist of properties.
   */
  objectTypes: GraphQLObjectType[]

  /**
   * An array of references to other types.
   */
  refTypes: GraphQLRefType[]
}
