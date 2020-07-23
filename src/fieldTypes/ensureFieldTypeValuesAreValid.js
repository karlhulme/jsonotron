const check = require('check-types')
const { JsonotronFieldTypeValuesValidationError } = require('jsonotron-errors')
const { fieldTypeValuesSchema } = require('../schemas')

/**
 * Raises an error if the given field type values object is not valid.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} fieldTypeValues A field type values object to check for validatity.
 */
function ensureFieldTypeValuesObjectIsValid (ajv, fieldTypeValues) {
  const validator = ajv.compile(fieldTypeValuesSchema)

  if (!validator(fieldTypeValues)) {
    throw new JsonotronFieldTypeValuesValidationError(fieldTypeValues.name, fieldTypeValues.lang,
      `Unable to validate against fieldTypeValuesSchema.\n${JSON.stringify(validator.errors, null, 2)}`)
  }
}

/**
 * Raises an error if any of the given field type values are not valid.
 * A valid field type doc will conform to the fieldTypeValuesSchema.
 * @param {Object} ajv A json validator.
 * @param {Array} fieldTypeValues An array of field types docs.
 */
function ensureFieldTypeValuesAreValid (ajv, fieldTypeValues) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.array.of.object(fieldTypeValues)

  fieldTypeValues.forEach(ftv => ensureFieldTypeValuesObjectIsValid(ajv, ftv))
}

module.exports = ensureFieldTypeValuesAreValid
