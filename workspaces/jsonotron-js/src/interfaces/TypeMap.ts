import { TypeMapObject } from './TypeMapObject'
import { TypeMapRef } from './TypeMapRef'

/**
 * Represents a map of a GraphQL system built from
 * one or more Jsonotron type systems.
 */
export interface TypeMap {
  /**
   * An array of the object types that consist of properties.
   */
  objectTypes: TypeMapObject[]

  /**
   * An array of references to other types.
   */
  refTypes: TypeMapRef[]
}
