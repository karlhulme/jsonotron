const check = require('check-types')
const createJsonSchemaForDocTypeFunctionParameters = require('./createJsonSchemaForDocTypeFunctionParameters')
const getFilterParameters = require('./getFilterParameters')

/**
 * Creates a JSON schema for the filter parameters of a given document type.
 * @param {Object} docType A document type.
 * @param {String} filterName The name of a filter.
 * @param {Array} fieldTypes An array of field types.
 * @param {Boolean} [fragment] True if the $schema property should be omitted from the result.
 * @param {String} [externalDefs] A path to external definitions.  If supplied, then
 * the definitions property will omitted from the result.
 */
function createJsonSchemaForDocTypeFilterParameters (docType, filterName, fieldTypes, fragment, externalDefs) {
  check.assert.object(docType)
  check.assert.string(filterName)
  check.assert.array.of.object(fieldTypes)

  const filterParameters = getFilterParameters(docType, filterName)
  return createJsonSchemaForDocTypeFunctionParameters(docType, 'Filter ' + filterName, filterParameters, fieldTypes, fragment, externalDefs)
}

module.exports = createJsonSchemaForDocTypeFilterParameters
