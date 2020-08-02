const check = require('check-types')
const { JsonotronInternalError } = require('jsonotron-errors')

/**
 * Returns the parameters defined for the given filter name
 * on the given doc type.
 * @param {Object} docType A doc type.
 * @param {String} filterName The name of a filter.
 */
function getFilterParameters (docType, filterName) {
  check.assert.object(docType)
  check.assert.string(filterName)

  if (typeof docType.filters === 'object' && typeof docType.filters[filterName] === 'object') {
    return docType.filters[filterName].parameters || {}
  } else {
    throw new JsonotronInternalError(`Unrecognised filter '${filterName}' on doc type '${docType.name}'.`)
  }
}

module.exports = getFilterParameters
