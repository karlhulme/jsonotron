const check = require('check-types')
const { JsonotronFieldTypeValidationError } = require('jsonotron-errors')
const { fieldTypeSchema } = require('../schemas')
const { ensureEnumType } = require('../enumType')
const { pascalToTitleCase } = require('../utils')
const createValueValidatorForFieldType = require('./createValueValidatorForFieldType')

/**
 * Raises an error if the field type fails to conform to the fieldTypeSchema.
 * @param {Object} ajv A JSON schema validator.
 * @param {String} fieldType A field type.
 */
function validateEnumTypeWithSchema (ajv, fieldType) {
  check.assert.object(ajv)
  check.assert.object(fieldType)

  const validator = ajv.compile(fieldTypeSchema)

  if (!validator(fieldType)) {
    throw new JsonotronFieldTypeValidationError(fieldType.name,
      `Unable to validate against fieldTypeSchema.\n${JSON.stringify(validator.errors, null, 2)}`)
  }
}

/**
 * Patches any missing/optional fields.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} roleType A role type object to check for validity.
 */
function patchFieldType (fieldType) {
  if (typeof fieldType.type === 'undefined') {
    fieldType.type = 'field'
  }

  if (typeof fieldType.title === 'undefined') {
    fieldType.title = pascalToTitleCase(fieldType.name)
  }

  if (typeof fieldType.category === 'undefined') {
    fieldType.category = ''
  }

  if (typeof fieldType.paragraphs === 'undefined') {
    fieldType.paragraphs = []
  }

  if (typeof fieldType.examples === 'undefined') {
    fieldType.examples = []
  }

  for (const example of fieldType.examples) {
    if (typeof example.paragraphs === 'undefined') {
      example.paragraphs = []
    }
  }

  if (typeof fieldType.validTestCases === 'undefined') {
    fieldType.validTestCases = []
  }

  if (typeof fieldType.invalidTestCases === 'undefined') {
    fieldType.invalidTestCases = []
  }

  if (typeof fieldType.referencedFieldTypes === 'undefined') {
    fieldType.referencedFieldTypes = []
  }

  if (typeof fieldType.referencedEnumTypes === 'undefined') {
    fieldType.referencedEnumTypes = []
  }
}

/**
 * Raises an error if any of the given example test cases are
 * found to be invalid.
 * @param {String} fieldTypeName The name of a field type.
 * @param {Function} validator A validator function that accepts a single parameter
 * and returns a boolean that indicates if the parameter was valid.  If the function
 * returns false it should also store the reason on an errors property.
 * @param {Array} examples An array of examples.
 */
function ensureExamplesAreValid (fieldTypeName, validator, examples) {
  for (let i = 0; i < examples.length; i++) {
    if (!validator(examples[i].value)) {
      throw new JsonotronFieldTypeValidationError(fieldTypeName,
        `Example value '${JSON.stringify(examples[i].value)}' at index ${i} does not validate with the schema.\n` +
        JSON.stringify(validator.errors, null, 2))
    }
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
        `Valid test case value '${JSON.stringify(validTestCases[i])}' does not validate with the schema.\n` +
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
        `Invalid test case value '${JSON.stringify(invalidTestCases[i])}' does (but should not) validate.`)
    }
  }
}

/**
 * Raises an error if the given field types are not valid.
 * Due to the nature of one field depending upon another, they are
 * validated together as collection.
 * @param {Object} ajv A JSON schema validator.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 */
function ensureFieldTypes (ajv, fieldTypes, enumTypes) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.array.of.object(fieldTypes)
  check.assert.array.of.object(enumTypes)

  // first ensure the enum types are valid
  enumTypes.forEach(enumType => ensureEnumType(ajv, enumType))

  // in the first pass, we ensure that each field type conforms to
  // the schema and we patch in any missing fields.
  fieldTypes.forEach(fieldType => {
    validateEnumTypeWithSchema(ajv, fieldType)
    patchFieldType(fieldType)
  })

  // in the second pass we build a validator (which may involve importing the definitions
  // of other field types) and then validate the example values.
  fieldTypes.forEach(fieldType => {
    const validator = createValueValidatorForFieldType(ajv, fieldType, fieldTypes, enumTypes)
    ensureExamplesAreValid(fieldType.name, validator, fieldType.examples)
    ensureValidTestCasesAreValid(fieldType.name, validator, fieldType.validTestCases)
    ensureInvalidTestCasesAreInvalid(fieldType.name, validator, fieldType.invalidTestCases)
  })
}

module.exports = ensureFieldTypes
