const check = require('check-types')

/**
 * Returns an array of operation names declared on the doc type.
 * @param {Object} docType A doc type.
 */
function getOperationNames (docType) {
  check.assert.object(docType)

  if (typeof docType.operations === 'object') {
    return Object.keys(docType.operations)
  } else {
    return []
  }
}

module.exports = getOperationNames
