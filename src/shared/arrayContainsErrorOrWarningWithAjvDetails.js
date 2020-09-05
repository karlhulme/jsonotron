import check from 'check-types'

/**
 * Returns true if the objects are both defined and both equal strings.
 * @param {String} [a] A string.
 * @param {Any} [b] A string.
 */
const isSame = function (a, b) {
  return (typeof a === 'undefined' && typeof b === 'undefined') || (a === b)
}

/**
 * Returns true if the keyword, dataPath, schemaPath and message properties
 * on the given details match the details of an error already in the collection.
 * @param {Array} array An array.
 * @param {Object} details An object that contains additional details on an error
 * supplied by AJV when validation fails.
 */
export function arrayContainsErrorOrWarningWithAjvDetails (array, details) {
  check.assert.array(array)
  check.assert.object(details)

  const index = array.findIndex(e => {
    return e.details &&
      isSame(e.details.keyword, details.keyword) &&
      isSame(e.details.dataPath, details.dataPath) &&
      isSame(e.details.schemaPath, details.schemaPath) &&
      isSame(e.details.message, details.message)
  })

  return index > -1
}
