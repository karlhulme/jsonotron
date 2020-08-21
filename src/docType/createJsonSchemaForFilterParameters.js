const check = require('check-types')
const { JsonotronUnrecognisedFilterNameError } = require('jsonotron-errors')
const { createJsonSchemaForFieldBlock } = require('../fieldBlock')

/**
 * Returns a JSON Schema for validating the parameters of an filter.
 * @param {Object} docType A doc type.
 * @param {String} filterName The name of an filer.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 */
function createJsonSchemaForFilterParameters (docType, filterName, fieldTypes, enumTypes) {
  check.assert.object(docType)
  check.assert.string(filterName)
  check.assert.array.of.object(fieldTypes)
  check.assert.array.of.object(enumTypes)

  const filter = docType.filters[filterName]

  if (!filter) {
    throw new JsonotronUnrecognisedFilterNameError(docType.name, filterName)
  }

  return createJsonSchemaForFieldBlock(
    `Doc Type "${docType.name}" Filter "${filterName}"`,
    filter.parameters,
    fieldTypes,
    enumTypes
  )
}

module.exports = createJsonSchemaForFilterParameters
