import { ValidateFunction } from 'ajv'

/**
 * Provides a set of type validators that can parse an object
 * and indicate if the contents is a valid type description.
 */
export interface TypeValidators {
  /**
   * A validator that returns true if the given resource is a valid array type.
   */
  arrayTypeValidator: ValidateFunction

  /**
   * A validator that returns true if the given resource is a valid bool scalar type.
   */
  boolScalarTypeValidator: ValidateFunction

  /**
   * A validator that returns true if the given resource is a valid enum scalar type.
   */
  enumScalarTypeValidator: ValidateFunction

  /**
   * A validator that returns true if the given resource is a valid float scalar type.
   */
  floatScalarTypeValidator: ValidateFunction

  /**
   * A validator that returns true if the given resource is a valid int scalar type.
   */
  intScalarTypeValidator: ValidateFunction

  /**
   * A validator that returns true if the given resource is a valid object type.
   */
  objectTypeValidator: ValidateFunction

  /**
   * A validator that returns true if the given resource is a valid record type.
   */
  recordTypeValidator: ValidateFunction

  /**
   * A validator that returns true if the given resource is a valid string scalar type.
   */
  stringScalarTypeValidator: ValidateFunction
}
