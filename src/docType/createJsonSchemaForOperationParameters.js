const check = require('check-types')
const { JsonotronUnrecognisedOperationNameError } = require('jsonotron-errors')
const createJsonSchemaForFieldBlock = require('./createJsonSchemaForFieldBlock')

/**
 * Returns a JSON Schema for validating the parameters of an operation.
 * @param {Object} docType A doc type.
 * @param {String} operationName The name of an operation.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 */
function createJsonSchemaForOperationParameters (docType, operationName, fieldTypes, enumTypes) {
  check.assert.object(docType)
  check.assert.string(operationName)
  check.assert.array.of.object(fieldTypes)
  check.assert.array.of.object(enumTypes)

  const operation = docType.operations[operationName]

  if (!operation) {
    throw new JsonotronUnrecognisedOperationNameError(docType.name, operationName)
  }

  return createJsonSchemaForFieldBlock(
    `Doc Type "${docType.name}" Operation "${operationName}"`,
    operation.parameters,
    fieldTypes,
    enumTypes
  )
}

module.exports = createJsonSchemaForOperationParameters
