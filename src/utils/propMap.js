/**
 * Returns a new object with the same properties as the given object where each
 * property has been passed to the mapFunc.
 * @param {Object} object An object.
 * @param {Function} mapFunc A function (prop) which is given a property from the object
 * and should return a new property.
 */
function propMap (object, mapFunc) {
  const result = {}

  for (const propertyName in object) {
    const property = object[propertyName]
    result[propertyName] = mapFunc(property)
  }

  return result
}

module.exports = propMap
