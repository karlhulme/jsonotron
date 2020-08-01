const check = require('check-types')
const { JsonotronDocTypeDocsValidationError } = require('jsonotron-errors')
const { docTypeDocsSchema } = require('../schemas')

/**
 * Raises an error if the given doc type docs object is not valid.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} docTypeDocs A doc type docs object to check for validatity.
 */
function ensureDocTypeDocsObjectIsValid (ajv, docTypeDocs) {
  const validator = ajv.compile(docTypeDocsSchema)

  if (!validator(docTypeDocs)) {
    throw new JsonotronDocTypeDocsValidationError(docTypeDocs.name, docTypeDocs.lang,
      `Unable to validate against docTypeDocsSchema.\n${JSON.stringify(validator.errors, null, 2)}`)
  }
}

/**
 * Raises an error if any of the given doc type docs are not valid.
 * A valid doc type doc will conform to the docTypeDocsSchema.
 * @param {Object} ajv A json validator.
 * @param {Array} docTypeDocs An array of field types docs.
 */
function ensureDocTypeDocsAreValid (ajv, docTypeDocs) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.array.of.object(docTypeDocs)

  docTypeDocs.forEach(dtd => ensureDocTypeDocsObjectIsValid(ajv, dtd))
}

module.exports = ensureDocTypeDocsAreValid
