const check = require('check-types')

const defaultMaxOpsSize = 10

/**
 * Returns the maximum size of the doc ops array
 * as defined in the policy of the given document type.
 * @param {Object} docType A doc type.
 */
function getMaxOpsSize (docType) {
  check.assert.object(docType)

  if (typeof docType.policy === 'object') {
    return docType.policy.maxOpsSize || defaultMaxOpsSize
  } else {
    return defaultMaxOpsSize
  }
}

module.exports = getMaxOpsSize
