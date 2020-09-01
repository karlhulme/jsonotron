/**
 * Creates a validation result with methods for adding
 * errors and warnings.
 */
export class ValidationResult {
  constructor () {
    this.errors = []
    this.warnings = []
  }

  /**
   * Add an error to the validation result.
   * @param {String} typeName The name of a type that is being validated.
   * @param {String} message A message that describes the error.
   * @param {Object} details An object that contains additional details on the error.
   */
  addError (typeName, message, details) {
    this.errors.push({ typeName, message, details })
  }

  /**
   * Add a warning to the validation result.
   * @param {String} typeName The name of a type that is being validated.
   * @param {String} message A message that describes the warning.
   * @param {Object} details An object that contains additional details on the warning.
   */
  addWarning (typeName, message, details) {
    this.warnings.push({ typeName, message, details })
  }

  /**
   * Adds the errors and warnings from the given validation result
   * into this instance.
   * @param {ValidationResult} vr A validation result.
   */
  addExisting (vr) {
    this.errors.push(...vr.errors)
    this.warnings.push(...vr.warnings)
  }

  /**
   * Returns true if the keyword, dataPath, schemaPath and message properties
   * on the given details match the details of an error already in the collection.
   * @param {Object} details An object that contains additional details on an error.
   */
  containsError (details) {
    const isSame = function (a, b) {
      return (typeof a === 'undefined' && typeof b === 'undefined') || (a === b)
    }

    const index = this.errors.findIndex(e => {
      return isSame(e.details.keyword, details.keyword) &&
        isSame(e.details.dataPath, details.dataPath) &&
        isSame(e.details.schemaPath, details.schemaPath) &&
        isSame(e.details.message, details.message)
    })

    return index > -1
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
   * Returns true if the validation result contains no errors.
   */
  isSuccessful () {
    return this.errors.length === 0
  }

  /**
   * Returns true if the validation result contains no errors and no warnings.
   */
  isSuccessfulWithNoWarnings () {
    return this.errors.length === 0 && this.warnings.length === 0
  }

  /**
   * Returns a POJO with the errors and warnings.
   */
  toObject () {
    return {
      errors: this.getErrors(),
      warnings: this.getWarnings()
    }
  }
}
