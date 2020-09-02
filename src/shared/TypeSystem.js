import check from 'check-types'

/**
 * Creates an object that contains the results of executing a validator.
 * @param {Boolean} found True if the validator was found.
 * @param {Boolean} validated True if the validator returned true for the value tested.
 * @param {Array|Null} errors An array of error objects or null if no errors were found.
 */
function createValidatorResult (found, validated, errors) {
  return {
    found,
    validated,
    errors
  }
}

/**
 * Represents the result of a compilation attempt.  This object
 * has methods for adding warnings and errors and then helper
 * methods for determining if the compilation process was successful or not.
 */
export class TypeSystem {
  constructor () {
    // error and warning arrays
    this.errors = []
    this.warnings = []

    // patched types
    this.patchedEnumTypes = []
    this.patchedSchemaTypes = []
    this.patchedFieldBlockTypes = []

    // validators
    this.enumTypeValidators = {}
    this.schemaTypeValidators = {}
    this.fieldBlockTypeValidators = {}
  }

  /**
   * Add an error to the compilation result.
   * @param {String} typeName The name of a type that is being compiled.
   * @param {String} message A message that describes the error.
   * @param {Object} details An object that contains additional details on the error.
   */
  addError (typeName, message, details) {
    check.assert.string(typeName)
    check.assert.string(message)
    check.assert.object(details)

    this.errors.push({ typeName, message, details })
  }

  /**
   * Add an error object to the compilation result.
   * @param {Object} error An error object that has typeName, message and details properties.
   */
  addErrorObject (error) {
    check.assert.object(error)
    check.assert.string(error.typeName)
    check.assert.string(error.message)
    check.assert.object(error.details)

    this.errors.push(error)
  }

  /**
   * Add a warning to the compilation result.
   * @param {String} typeName The name of a type that is being compiled.
   * @param {String} message A message that describes the warning.
   * @param {Object} details An object that contains additional details on the warning.
   */
  addWarning (typeName, message, details) {
    check.assert.string(typeName)
    check.assert.string(message)
    check.assert.object(details)

    this.warnings.push({ typeName, message, details })
  }

  /**
   * Add a warning object to the compilation result.
   * @param {Object} warning A warning object that has typeName, message and details properties.
   */
  addWarningObject (warning) {
    check.assert.object(warning)
    check.assert.string(warning.typeName)
    check.assert.string(warning.message)
    check.assert.object(warning.details)

    this.warnings.push(warning)
  }

  /**
   * Add a patched enum type to the compilation result.
   * @param {Object} enumType An enum type.
   */
  addPatchedEnumType (enumType) {
    check.assert.object(enumType)
    check.assert.string(enumType.name)

    this.patchedEnumTypes.push(enumType)
  }

  /**
   * Add a patched schema type to the compilation result.
   * @param {Object} schemaType A schema type.
   */
  addPatchedSchemaType (schemaType) {
    check.assert.object(schemaType)
    check.assert.string(schemaType.name)

    this.patchedSchemaTypes.push(schemaType)
  }

  /**
   * Add a patched field block type to the compilation result.
   * @param {Object} fieldBlockType A field block type.
   */
  addPatchedFieldBlockType (fieldBlockType) {
    check.assert.object(fieldBlockType)
    check.assert.string(fieldBlockType.name)

    this.patchedFieldBlockTypes.push(fieldBlockType)
  }

  /**
   * Adds the given validator to the list of enum type validators
   * @param {String} enumTypeName The name of an enum type.
   * @param {Function} validator A validator function.
   */
  addEnumTypeValidator (enumTypeName, validator) {
    check.assert.string(enumTypeName)
    check.assert.function(validator)

    this.enumTypeValidators[enumTypeName] = validator
  }

  /**
   * Adds the given validator to the list of schema type validators
   * @param {String} schemaTypeName The name of a schema type.
   * @param {Function} validator A validator function.
   */
  addSchemaTypeValidator (schemaTypeName, validator) {
    check.assert.string(schemaTypeName)
    check.assert.function(validator)

    this.schemaTypeValidators[schemaTypeName] = validator
  }

  /**
   * Adds the given validator to the list of field block type validators
   * @param {String} fieldBlockTypeName The name of a field block type.
   * @param {Function} validator A validator function.
   */
  addFieldBlockTypeValidator (fieldBlockTypeName, validator) {
    check.assert.string(fieldBlockTypeName)
    check.assert.function(validator)

    this.fieldBlockTypeValidators[fieldBlockTypeName] = validator
  }

  /**
   * Returns the errors as an array of (message, details) elements.
   */
  getErrors () {
    return [...this.errors]
  }

  /**
   * Returns the warnings as an array of (message, details) elements.
   */
  getWarnings () {
    return [...this.warnings]
  }

  /**
   * Returns the patched enum types that passed the validation process.
   * The enum types here may have subsequently failed the schema generation,
   * schema compilation or verification steps.
   */
  getPatchedEnumTypes () {
    return [...this.patchedEnumTypes]
  }

  /**
   * Returns the patched schema types that passed the validation process.
   * The schema types here may have subsequently failed the schema generation,
   * schema compilation or verification steps.
   */
  getPatchedSchemaTypes () {
    return [...this.patchedSchemaTypes]
  }

  /**
   * Returns the patched field block types that passed the validation process.
   * The field blocks may have subsequently failed the schema generation,
   * schema compilation or verification steps.
   */
  getPatchedFieldBlockTypes () {
    return [...this.patchedFieldBlockTypes]
  }

  /**
   * Executes an enum type validator or schema type validator to see if
   * the given value is valid.
   * @param {String} fieldTypeName The name of an enum type or schema type.
   * @param {Object} value Any value.
   */
  executeFieldTypeValidator (fieldTypeName, value) {
    const validator = this.enumTypeValidators[fieldTypeName] || this.schemaTypeValidators[fieldTypeName]

    if (validator) {
      const result = validator(value)

      if (result) {
        return createValidatorResult(true, true, null)
      } else {
        return createValidatorResult(true, false, [...validator.errors])
      }
    } else {
      return createValidatorResult(false, false, null)
    }
  }

  /**
   * Executes a field block type validator to see if the given field block value is valid.
   * @param {String} fieldBlockTypeName The name of the field block type.
   * @param {Object} fieldBlockValue Any value.
   */
  executeFieldBlockTypeValidator (fieldBlockTypeName, fieldBlockValue) {
    const validator = this.fieldBlockTypeValidators[fieldBlockTypeName]

    if (validator) {
      const result = validator(fieldBlockValue)

      if (result) {
        return createValidatorResult(true, true, null)
      } else {
        return createValidatorResult(true, false, [...validator.errors])
      }
    } else {
      return createValidatorResult(false, false, null)
    }
  }

  /**
   * Returns true if the compilation result contains no errors.
   */
  isSuccessful () {
    return this.errors.length === 0
  }

  /**
   * Returns true if the compilation result contains no errors and no warnings.
   */
  isSuccessfulWithNoWarnings () {
    return this.errors.length === 0 && this.warnings.length === 0
  }

  /**
   * Returns a formatted string containing the errors and warnings.
   */
  toString () {
    return JSON.stringify({
      errors: this.getErrors(),
      warnings: this.getWarnings()
    }, null, 2)
  }
}
