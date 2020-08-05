const check = require('check-types')
const { JsonotronFieldTypeResolutionError } = require('jsonotron-errors')

/**
 * Returns the field type with the given name or raises a
 * JsonotronFieldTypeResolutionError if the field type cannot be found.
 * @param {String} fieldTypeName The name of a field type.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 */
function getFieldOrEnumTypeFromArrays (fieldTypeName, fieldTypes, enumTypes) {
  check.assert.string(fieldTypeName)
  check.assert.array.of.object(fieldTypes)

  const fieldType = fieldTypes.find(ft => ft.name === fieldTypeName)
  const enumType = enumTypes.find(et => et.name === fieldTypeName)

  if (fieldType) {
    return fieldType
  } else if(enumType) {
    return enumType
  } else {
    throw new JsonotronFieldTypeResolutionError(fieldTypeName)
  }
}

module.exports = getFieldOrEnumTypeFromArrays
