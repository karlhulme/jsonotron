const check = require('check-types')
const { JsonotronCategoryValidationError } = require('jsonotron-errors')
const { categorySchema } = require('../schemas')

/**
 * Raises an error if the given category is not valid.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} category A category object to check for validatity.
 */
function ensureCategoryIsValid (ajv, category) {
  const validator = ajv.compile(categorySchema)

  if (!validator(category)) {
    throw new JsonotronCategoryValidationError(category.name,
      `Unable to validate against categorySchema.\n${JSON.stringify(validator.errors, null, 2)}`)
  }
}

/**
 * Raises an error if any of the given categories are not valid.
 * A valid category will conform to the categorySchema.
 * @param {Object} ajv A json validator.
 * @param {Array} categories An array of categories.
 */
function ensureFieldTypeDocsAreValid (ajv, categories) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.array.of.object(categories)

  categories.forEach(c => ensureCategoryIsValid(ajv, c))
}

module.exports = ensureFieldTypeDocsAreValid
