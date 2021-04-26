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
   * A validator that returns true if the given resource is a valid bool type.
   */
  boolTypeValidator: ValidateFunction

  /**
   * A validator that returns true if the given resource is a valid enum type.
   */
  enumTypeValidator: ValidateFunction

  /**
   * A validator that returns true if the given resource is a valid float type.
   */
  floatTypeValidator: ValidateFunction

  /**
   * A validator that returns true if the given resource is a valid int type.
   */
  intTypeValidator: ValidateFunction

  /**
   * A validator that returns true if the given resource is a valid object type.
   */
  objectTypeValidator: ValidateFunction

  /**
   * A validator that returns true if the given resource is a valid record type.
   */
  recordTypeValidator: ValidateFunction

  /**
   * A validator that returns true if the given resource is a valid string type.
   */
  stringTypeValidator: ValidateFunction
}
