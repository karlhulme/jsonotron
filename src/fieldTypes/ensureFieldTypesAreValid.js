const check = require('check-types')
const { JsonotronFieldTypeValidationError } = require('jsonotron-errors')
const { fieldTypeSchema } = require('../schemas')
const createFieldTypeValueValidator = require('./createFieldTypeValueValidator')

/**
 * Raises an error if the field type fails to conform to the fieldTypeSchema.
 * @param {Object} ajv A JSON schema validator.
 * @param {String} fieldType A field type.
 */
function ensureFieldTypeAgainstFieldTypeSchema (ajv, fieldType) {
  check.assert.object(ajv)

  const fieldTypeSchemaValidator = ajv.compile(fieldTypeSchema)

  if (!fieldTypeSchemaValidator(fieldType)) {
    throw new JsonotronFieldTypeValidationError(fieldType.name,
      `Unable to validate against fieldTypeSchema.\n${JSON.stringify(fieldTypeSchemaValidator.errors, null, 2)}`)
  }
}

/**
 * Raises an error if any of the given valid test cases are
 * found to be invalid.
 * @param {String} fieldTypeName The name of a field type.
 * @param {Function} validator A validator function that accepts a single parameter
 * and returns a boolean that indicates if the parameter was valid.  If the function
 * returns false it should also store the reason on an errors property.
 * @param {Array} validTestCases An array of values.
 */
function ensureValidTestCasesAreValid (fieldTypeName, validator, validTestCases) {
  for (let i = 0; i < validTestCases.length; i++) {
    if (!validator(validTestCases[i])) {
      throw new JsonotronFieldTypeValidationError(fieldTypeName,
        `Example value '${JSON.stringify(validTestCases[i])}' does not validate with the schema.\n` +
        JSON.stringify(validator.errors, null, 2))
    }
  }
}

/**
 * Raises an error if any of the given invalid test cases are
 * found to be valid.
 * @param {String} fieldTypeName The name of a field type.
 * @param {Function} validator A validator function that accepts a single parameter
 * and returns a boolean that indicates if the parameter was valid.  If the function
 * returns false it should also store the reason on an errors property.
 * @param {Array} invalidTestCases An array of values.
 */
function ensureInvalidTestCasesAreInvalid (fieldTypeName, validator, invalidTestCases) {
  for (let i = 0; i < invalidTestCases.length; i++) {
    if (validator(invalidTestCases[i])) {
      throw new JsonotronFieldTypeValidationError(fieldTypeName,
        `Example invalid value '${JSON.stringify(invalidTestCases[i])}' does (but should not) validate.\n` +
        JSON.stringify(validator.errors, null, 2))
    }
  }
}

/**
 * Raises an error if the given field type is not valid.
 * @param {Object} ajv A JSON schema validator.
 * @param {Array} fieldTypes An array of field types.
 * @param {Object} fieldType A field type to check for validatity.
 */
function ensureFieldTypeIsValid (ajv, fieldTypes, fieldType) {
  ensureFieldTypeAgainstFieldTypeSchema(ajv, fieldType)

  const fieldTypeValueValidator = createFieldTypeValueValidator(ajv, fieldTypes, fieldType.name)

  if (fieldType.type === 'schema') {
    ensureValidTestCasesAreValid(fieldType.name, fieldTypeValueValidator, fieldType.validTestCases)
    ensureInvalidTestCasesAreInvalid(fieldType.name, fieldTypeValueValidator, fieldType.invalidTestCases)
  }

  // Uniqueness of enum values is picked up by creating a Json Schema for the field type.
  // This will build an enum: [a, b, c] which must contain unique elements to be a valid schema.
}

/**
 * Raises an error if any of the given field types are not valid.
 * A valid field type will conform to the fieldTypeSchema,
 * declare a compilable JSON Schema (or be an enum), and
 * declare correct example and invalid example values.
 * @param {Object} ajv A json validator.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureFieldTypesAreValid (ajv, fieldTypes) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.array.of.object(fieldTypes)

  for (let i = 0; i < fieldTypes.length; i++) {
    ensureFieldTypeIsValid(ajv, fieldTypes, fieldTypes[i])
  }
}

module.exports = ensureFieldTypesAreValid
