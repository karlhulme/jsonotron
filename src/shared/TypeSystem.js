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
    this.patchedFieldBlockDefinitions = []

    // validators
    this.enumTypeValidators = {}
    this.schemaTypeValidators = {}
    this.fieldBlockDefinitionValidators = {}
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
   * Add a patched field block definition to the compilation result.
   * @param {Object} fieldBlockDefinition A field block definition.
   */
  addPatchedFieldBlockDefinition (fieldBlockDefinition) {
    check.assert.object(fieldBlockDefinition)
    check.assert.string(fieldBlockDefinition.name)

    this.patchedFieldBlockDefinitions.push(fieldBlockDefinition)
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
   * Adds the given validator to the list of field block definition validators
   * @param {String} fieldBlockDefinitionName The name of a field block definition.
   * @param {Function} validator A validator function.
   */
  addFieldBlockDefinitionValidator (fieldBlockDefinitionName, validator) {
    check.assert.string(fieldBlockDefinitionName)
    check.assert.function(validator)

    this.fieldBlockDefinitionValidators[fieldBlockDefinitionName] = validator
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
   * Returns the patched field block definitions that passed the validation process.
   * The field block definitions may have subsequently failed the schema generation,
   * schema compilation or verification steps.
   */
  getPatchedFieldBlockDefinitions () {
    return [...this.patchedFieldBlockDefinitions]
  }

  /**
   * Returns the names of the field type validators.  That is the names
   * of the enum type validators and the schema type validators combined.
   */
  getFieldTypeValidatorNames () {
    return Object.keys(this.enumTypeValidators).concat(Object.keys(this.schemaTypeValidators))
  }

  /**
   * Returns the names of the field block definition validators.
   */
  getFieldBlockDefinitionValidatorNames () {
    return Object.keys(this.fieldBlockDefinitionValidators)
  }

  /**
   * Returns the validator for the named field type.
   * @param {String} fieldTypeName The name of a field type.
   */
  getFieldTypeValidator (fieldTypeName) {
    return this.enumTypeValidators[fieldTypeName] || this.schemaTypeValidators[fieldTypeName]
  }

  /**
   * Returns the validator for the named field block definition.
   * @param {String} fieldBlockDefinitionName The name of a field block definition.
   */
  getFieldBlockDefinitionValidator (fieldBlockDefinitionName) {
    return this.fieldBlockDefinitionValidators[fieldBlockDefinitionName]
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
   * Executes a field block definition validator to see if the given field block value is valid.
   * @param {String} fieldBlockDefinitionName The name of the field block definition.
   * @param {Object} fieldBlockValue Any value.
   */
  executeFieldBlockDefinitionValidator (fieldBlockDefinitionName, fieldBlockValue) {
    const validator = this.fieldBlockDefinitionValidators[fieldBlockDefinitionName]

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
