const check = require('check-types')
const createJsonSchemaForDocTypeFunctionParameters = require('./createJsonSchemaForDocTypeFunctionParameters')
const getOperationParameters = require('./getOperationParameters')

/**
 * Creates a JSON schema for the operation parameters of a given document type.
 * @param {Object} docType A document type.
 * @param {String} operationName The name of an operation.
 * @param {Array} fieldTypes An array of field types.
 */
function createJsonSchemaForDocTypeOperationParameters (docType, operationName, fieldTypes) {
  check.assert.object(docType)
  check.assert.string(operationName)
  check.assert.array.of.object(fieldTypes)

  const operationParameters = getOperationParameters(docType, operationName)
  return createJsonSchemaForDocTypeFunctionParameters(docType, 'Operation ' + operationName, operationParameters, fieldTypes)
}

module.exports = createJsonSchemaForDocTypeOperationParameters
