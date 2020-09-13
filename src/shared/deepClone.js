import clone from 'clone-deep'

/**
 * Returns a deep cloned copy of the given object.
 * @param {Object} obj An object.
 */
export function deepClone (obj) {
  return clone(obj)
}
