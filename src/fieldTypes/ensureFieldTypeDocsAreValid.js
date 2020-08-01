const check = require('check-types')
const { JsonotronFieldTypeDocsValidationError } = require('jsonotron-errors')
const { fieldTypeDocsSchema } = require('../schemas')
const createFieldTypeValueValidator = require('./createFieldTypeValueValidator')

/**
 * Raises an error if the given field type docs object does not
 * conform to the fieldTypeDocsSchema.
 * @param {Object} ajv A json validator.
 * @param {Object} fieldTypeDocs A field type docs object.
 */
function ensureFieldTypeDocsSatisfiesSchema (ajv, fieldTypeDocs) {
  const validator = ajv.compile(fieldTypeDocsSchema)

  if (!validator(fieldTypeDocs)) {
    throw new JsonotronFieldTypeDocsValidationError(fieldTypeDocs.name, fieldTypeDocs.lang,
      `Unable to validate against fieldTypeDocsSchema.\n${JSON.stringify(validator.errors, null, 2)}`)
  }
}

/**
 * Raises an error if the examples on the given field type docs
 * object fail to conform to the underlying field type.
 * @param {Object} ajv A json validator.
 * @param {Object} fieldTypeValues A field type docs object.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureFieldTypeDocsExamplesAreValid (ajv, fieldTypeValues, fieldTypes) {
  const fieldType = fieldTypes.find(ft => ft.name === fieldTypeValues.name)

  if (!fieldType) {
    throw new JsonotronFieldTypeDocsValidationError(fieldTypeValues.name, fieldTypeValues.lang,
      'Docs supplied for unknown field type.')
  }

  const fieldTypeValueValidator = createFieldTypeValueValidator(ajv, fieldTypes, fieldType.name)

  fieldTypeValues.examples.forEach(example => {
    if (!fieldTypeValueValidator(example.value)) {
      throw new JsonotronFieldTypeDocsValidationError(fieldTypeValues.name, fieldTypeValues.lang,
        `Example value '${JSON.stringify(example.value)}' does not validate with the schema.\n` +
        JSON.stringify(fieldTypeValueValidator.errors, null, 2))
    }
  })
}

/**
 * Raises an error if the given field type docs object is not valid.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} fieldTypeDocs A field type docs object to check for validatity.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureFieldTypeDocsObjectIsValid (ajv, fieldTypeDocs, fieldTypes) {
  ensureFieldTypeDocsSatisfiesSchema(ajv, fieldTypeDocs)
  ensureFieldTypeDocsExamplesAreValid(ajv, fieldTypeDocs, fieldTypes)
}

/**
 * Raises an error if any of the given field type docs are not valid.
 * A valid field type doc will conform to the fieldTypeDocsSchema.
 * @param {Object} ajv A json validator.
 * @param {Array} fieldTypeDocs An array of field types docs.
 * @param {Array} fieldTypes An array of field types.
 */
function ensureFieldTypeDocsAreValid (ajv, fieldTypeDocs, fieldTypes) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.array.of.object(fieldTypeDocs)
  check.assert.array.of.object(fieldTypes)

  fieldTypeDocs.forEach(ftd => ensureFieldTypeDocsObjectIsValid(ajv, ftd, fieldTypes))
}

module.exports = ensureFieldTypeDocsAreValid
