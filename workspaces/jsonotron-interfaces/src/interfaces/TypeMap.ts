import { TypeMapObject } from './TypeMapObject'
import { TypeMapRef } from './TypeMapRef'

/**
 * Represents a map of the types built from
 * one or more Jsonotron type systems.
 */
export interface TypeMap {
  /**
   * An array of the object types that contain properties.
   */
  objectTypes: TypeMapObject[]

  /**
   * An array of references that connect types or reach
   * a terminating json-schema scalar type.
   */
  refTypes: TypeMapRef[]
}
