const check = require('check-types')
const { JsonotronCategoryTypeValidationError } = require('jsonotron-errors')
const { categoryTypeSchema } = require('../schemas')
const { pascalToTitleCase } = require('../utils')

/**
 * Raises an error if the given category type does not conform to the categoryTypeSchema.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} categoryType A category type object to check for validatity.
 */
function validateEnumTypeWithSchema (ajv, categoryType) {
  const validator = ajv.compile(categoryTypeSchema)

  if (!validator(categoryType)) {
    throw new JsonotronCategoryTypeValidationError(categoryType.name,
      `Unable to validate against categoryTypeSchema.\n${JSON.stringify(validator.errors, null, 2)}`)
  }
}

/**
 * Patches any missing/optional fields.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} categoryType A category type object to check for validatity.
 */
function patchCategoryType (categoryType) {
  if (typeof categoryType.order === 'undefined') {
    categoryType.order = 1000
  }

  if (typeof categoryType.title === 'undefined') {
    categoryType.title = pascalToTitleCase(categoryType.name)
  }
}

/**
 * Raises an error if the given category is not valid, otherwise it
 * patches in any missing/optional fields.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} categoryType A category type to check for validatity.
 */
function ensureCategoryType (ajv, categoryType) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.object(categoryType)

  validateEnumTypeWithSchema(ajv, categoryType)
  patchCategoryType(categoryType)
}

module.exports = ensureCategoryType
