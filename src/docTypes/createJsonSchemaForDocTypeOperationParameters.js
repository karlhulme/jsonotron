const check = require('check-types')
const createJsonSchemaForDocTypeFunctionParameters = require('./createJsonSchemaForDocTypeFunctionParameters')
const getOperationParameters = require('./getOperationParameters')

/**
 * Creates a JSON schema for the operation parameters of a given document type.
 * @param {Object} docType A document type.
 * @param {String} operationName The name of an operation.
 * @param {Array} fieldTypes An array of field types.
 * @param {Boolean} [fragment] True if the $schema property should be omitted from the result.
 * @param {String} [externalDefs] A path to external definitions.  If supplied, then
 * the definitions property will omitted from the result.
 */
function createJsonSchemaForDocTypeOperationParameters (docType, operationName, fieldTypes, fragment, externalDefs) {
  check.assert.object(docType)
  check.assert.string(operationName)
  check.assert.array.of.object(fieldTypes)

  const operationParameters = getOperationParameters(docType, operationName)
  return createJsonSchemaForDocTypeFunctionParameters(docType, 'Operation ' + operationName, operationParameters, fieldTypes, fragment, externalDefs)
}

module.exports = createJsonSchemaForDocTypeOperationParameters
