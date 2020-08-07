const check = require('check-types')
const { JsonotronEnumTypeValidationError } = require('jsonotron-errors')
const { enumTypeSchema } = require('../schemas')
const { pascalToTitleCase } = require('../utils')

/**
 * Raises an error if the given enum type does not conform to the enumTypeSchema.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} enumType An enum type.
 */
function validateEnumTypeWithSchema (ajv, enumType) {
  const validator = ajv.compile(enumTypeSchema)

  if (!validator(enumType)) {
    throw new JsonotronEnumTypeValidationError(enumType.name,
      `Unable to validate against enumTypeSchema.\n${JSON.stringify(validator.errors, null, 2)}`)
  }
}

/**
 * Raises an error if any of the values in the items array appear multiple times.
 * @param {Object} enumType An enum type object to check.
 */
function validateItemValuesAreUnique (enumType) {
  const seen = []

  enumType.items.forEach(item => {
    if (seen.includes(item.value)) {
      throw new JsonotronEnumTypeValidationError(enumType.name,
        `Value '${item.value}' is not unique.`)
    } else {
      seen.push(item.value)
    }
  })
}

/**
 * Patches any missing/optional fields.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} enumType An enum type object to check for validity.
 */
function patchEnumType (enumType) {
  if (typeof enumType.type === 'undefined') {
    enumType.type = 'enum'
  }

  if (typeof enumType.title === 'undefined') {
    enumType.title = pascalToTitleCase(enumType.name)
  }

  if (typeof enumType.paragraphs === 'undefined') {
    enumType.paragraphs = []
  }

  for (const item of enumType.items) {
    if (typeof item.paragraphs === 'undefined') {
      item.paragraphs = [pascalToTitleCase(item.value.toString())]
    }

    if (typeof item.symbol === 'undefined') {
      item.symbol = ''
    }

    if (typeof item.deprecated === 'undefined') {
      item.deprecated = false
    }
  }
}

/**
 * Raises an error if the given enum type is not valid, otherwise it
 * patches in any missing/optional fields.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} enumType An enum type object to check for validatity.
 */
function ensureEnumType (ajv, enumType) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.object(enumType)

  validateEnumTypeWithSchema(ajv, enumType)
  validateItemValuesAreUnique(enumType)
  patchEnumType(enumType)
}

module.exports = ensureEnumType
