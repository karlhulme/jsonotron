import check from 'check-types'

/**
 * Returns a deep cloned copy of the given object.  The clone is performed
 * by converting the given object to a JSON string and back to an object.
 * @param {Object} obj An object.
 */
export function deepClone (obj) {
  check.assert.object(obj)
  return JSON.parse(JSON.stringify(obj))
}
