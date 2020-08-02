const check = require('check-types')

/**
 * Returns an array of calculated field names declared on the doc type.
 * @param {Object} docType A doc type.
 */
function getCalculatedFieldNames (docType) {
  check.assert.object(docType)

  if (typeof docType.calculatedFields === 'object') {
    return Object.keys(docType.calculatedFields)
  } else {
    return []
  }
}

module.exports = getCalculatedFieldNames
