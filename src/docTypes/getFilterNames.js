const check = require('check-types')

/**
 * Returns an array of filter names declared on the doc type.
 * @param {Object} docType A doc type.
 */
function getFilterNames (docType) {
  check.assert.object(docType)

  if (typeof docType.filters === 'object') {
    return Object.keys(docType.filters)
  } else {
    return []
  }
}

module.exports = getFilterNames
