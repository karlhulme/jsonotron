import { ValidateFunction } from 'ajv'

/**
 * Provides a set of type definition validators that can parse an object
 * and indicate if the contents is a valid type definition.
 */
export interface TypeDefValidators {
  /**
   * A validator that returns true if the given resource is a valid bool type.
   */
  boolTypeDefValidator: ValidateFunction

  /**
   * A validator that returns true if the given resource is a valid enum type.
   */
  enumTypeDefValidator: ValidateFunction

  /**
   * A validator that returns true if the given resource is a valid float type.
   */
  floatTypeDefValidator: ValidateFunction

  /**
   * A validator that returns true if the given resource is a valid int type.
   */
  intTypeDefValidator: ValidateFunction

  /**
   * A validator that returns true if the given resource is a valid object type.
   */
  objectTypeDefValidator: ValidateFunction

  /**
   * A validator that returns true if the given resource is a valid record type.
   */
  recordTypeDefValidator: ValidateFunction

  /**
   * A validator that returns true if the given resource is a valid string type.
   */
  stringTypeDefValidator: ValidateFunction
}
