const check = require('check-types')
const { JsonotronFieldTypeDocsValidationError } = require('jsonotron-errors')
const { fieldTypeDocsSchema } = require('../schemas')

/**
 * Raises an error if the given field type docs object is not valid.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} fieldTypeDocs A field type docs object to check for validatity.
 */
function ensureFieldTypeDocsObjectIsValid (ajv, fieldTypeDocs) {
  const validator = ajv.compile(fieldTypeDocsSchema)

  if (!validator(fieldTypeDocs)) {
    throw new JsonotronFieldTypeDocsValidationError(fieldTypeDocs.name, fieldTypeDocs.lang,
      `Unable to validate against fieldTypeDocsSchema.\n${JSON.stringify(validator.errors, null, 2)}`)
  }
}

/**
 * Raises an error if any of the given field type docs are not valid.
 * A valid field type doc will conform to the fieldTypeDocsSchema.
 * @param {Object} ajv A json validator.
 * @param {Array} fieldTypeDocs An array of field types docs.
 */
function ensureFieldTypeDocsAreValid (ajv, fieldTypeDocs) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.array.of.object(fieldTypeDocs)

  fieldTypeDocs.forEach(ftd => ensureFieldTypeDocsObjectIsValid(ajv, ftd))
}

module.exports = ensureFieldTypeDocsAreValid
