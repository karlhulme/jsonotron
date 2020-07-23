const check = require('check-types')
const { JsonotronCategoryDocsValidationError } = require('jsonotron-errors')
const { categoryDocsSchema } = require('../schemas')

/**
 * Raises an error if the given category docs object is not valid.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} categoryDocs A category docs object to check for validatity.
 */
function ensureCategoryDocsObjectIsValid (ajv, categoryDocs) {
  const validator = ajv.compile(categoryDocsSchema)

  if (!validator(categoryDocs)) {
    throw new JsonotronCategoryDocsValidationError(categoryDocs.name, categoryDocs.lang,
      `Unable to validate against categoryDocsSchema.\n${JSON.stringify(validator.errors, null, 2)}`)
  }
}

/**
 * Raises an error if any of the given category docs are not valid.
 * A valid category docs object will conform to the categoryDocsSchema.
 * @param {Object} ajv A json validator.
 * @param {Array} categoryDocs An array of field types docs.
 */
function ensureFieldTypeDocsAreValid (ajv, categoryDocs) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.array.of.object(categoryDocs)

  categoryDocs.forEach(cd => ensureCategoryDocsObjectIsValid(ajv, cd))
}

module.exports = ensureFieldTypeDocsAreValid
