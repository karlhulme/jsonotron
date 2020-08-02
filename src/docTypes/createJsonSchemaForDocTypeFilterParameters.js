const check = require('check-types')
const createJsonSchemaForDocTypeFunctionParameters = require('./createJsonSchemaForDocTypeFunctionParameters')
const getFilterParameters = require('./getFilterParameters')

/**
 * Creates a JSON schema for the filter parameters of a given document type.
 * @param {Object} docType A document type.
 * @param {String} filterName The name of a filter.
 * @param {Array} fieldTypes An array of field types.
 */
function createJsonSchemaForDocTypeFilterParameters (docType, filterName, fieldTypes) {
  check.assert.object(docType)
  check.assert.string(filterName)
  check.assert.array.of.object(fieldTypes)

  const filterParameters = getFilterParameters(docType, filterName)
  return createJsonSchemaForDocTypeFunctionParameters(docType, 'Filter ' + filterName, filterParameters, fieldTypes)
}

module.exports = createJsonSchemaForDocTypeFilterParameters
