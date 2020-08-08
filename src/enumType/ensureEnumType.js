const check = require('check-types')
const { JsonotronEnumTypeDocumentationMissingError, JsonotronEnumTypeValidationError } = require('jsonotron-errors')
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
  const missingDocumentationProperties = []

  if (typeof enumType.type === 'undefined') {
    enumType.type = 'enum'
  }

  if (typeof enumType.title === 'undefined') {
    enumType.title = pascalToTitleCase(enumType.name)
    missingDocumentationProperties.push('title')
  }

  if (typeof enumType.paragraphs === 'undefined') {
    enumType.paragraphs = []
    missingDocumentationProperties.push('paragraphs')
  }

  for (const item of enumType.items) {
    if (typeof item.paragraphs === 'undefined') {
      item.paragraphs = [pascalToTitleCase(item.value.toString())]
      missingDocumentationProperties.push(`items['${item.value}'].paragraphs`)
    }

    if (typeof item.symbol === 'undefined') {
      item.symbol = ''
    }

    if (typeof item.isDeprecated === 'undefined') {
      item.isDeprecated = false
    }
  }

  return missingDocumentationProperties
}

/**
 * Raises an error if the given enum type is not valid, otherwise it
 * patches in any missing/optional fields.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} enumType An enum type object to check for validatity.
 * @param {Boolean} includeDocumentation True if missing documentation should
 * cause the validation to fail.
 */
function ensureEnumType (ajv, enumType, includeDocumentation) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.object(enumType)

  validateEnumTypeWithSchema(ajv, enumType)
  validateItemValuesAreUnique(enumType)
  const missingDocumentationProperties = patchEnumType(enumType)

  if (includeDocumentation && missingDocumentationProperties.length > 0) {
    throw new JsonotronEnumTypeDocumentationMissingError(enumType.name, missingDocumentationProperties)
  }
}

module.exports = ensureEnumType
