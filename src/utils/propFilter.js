/**
 * Returns a new object with the same properties as the given object where those
 * properties pass whatever test is implemented by predicateFunc.
 * @param {Object} object An object.
 * @param {Function} predicateFunc A function (prop) which is given a property from the object
 * and should return a truthy value if the property should also appear on the result.
 */
function propFilter (object, predicateFunc) {
  const result = {}

  for (const propertyName in object) {
    const property = object[propertyName]

    if (predicateFunc(property)) {
      result[propertyName] = property
    }
  }

  return result
}

module.exports = propFilter
