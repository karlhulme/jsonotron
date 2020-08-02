const check = require('check-types')
const { JsonotronInternalError } = require('jsonotron-errors')

/**
 * Returns the parameters defined for the given operation name
 * on the given doc type.
 * @param {Object} docType A doc type.
 * @param {String} operationName The name of an operation.
 */
function getOperationParameters (docType, operationName) {
  check.assert.object(docType)
  check.assert.string(operationName)

  if (typeof docType.operations === 'object' && typeof docType.operations[operationName] === 'object') {
    return docType.operations[operationName].parameters || {}
  } else {
    throw new JsonotronInternalError(`Unrecognised operation '${operationName}' on doc type '${docType.name}'.`)
  }
}

module.exports = getOperationParameters
