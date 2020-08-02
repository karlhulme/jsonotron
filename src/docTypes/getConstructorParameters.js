const check = require('check-types')

/**
 * Returns the parameters defined for the constructor of the given doc type.
 * @param {Object} docType A doc type.
 */
function getConstructorParameters (docType) {
  check.assert.object(docType)

  if (typeof docType.ctor === 'object') {
    return docType.ctor.parameters || {}
  } else {
    return {}
  }
}

module.exports = getConstructorParameters
