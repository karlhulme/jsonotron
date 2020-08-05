const check = require('check-types')
const { createValueValidatorForEnumTypeArray, createValueValidatorForEnumType } = require('../enumType')
const { createValueValidatorForFieldTypeArray, createValueValidatorForFieldType } = require('../fieldType')

/**
 * Returns a function (v) that determines if v is a valid value for the fieldOrEnumType.
 * @param {Object} ajv A json validator.
 * @param {Object} fieldOrEnumType A field or enum type.
 * @param {Boolean} isArray True if the field or enum type declared is an array.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 */
function createValueValidatorForFieldOrEnumType (ajv, fieldOrEnumType, isArray, fieldTypes, enumTypes) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.object(fieldOrEnumType)
  check.assert.string(fieldOrEnumType.type)
  check.assert.boolean(isArray)
  check.assert.array.of.object(fieldTypes)
  check.assert.array.of.object(enumTypes)

  if (fieldOrEnumType.type === 'field') {
    return isArray
      ? createValueValidatorForFieldTypeArray(ajv, fieldOrEnumType, fieldTypes, enumTypes)
      : createValueValidatorForFieldType(ajv, fieldOrEnumType, fieldTypes, enumTypes)
  } else {
    return isArray
      ? createValueValidatorForEnumTypeArray(ajv, fieldOrEnumType)
      : createValueValidatorForEnumType(ajv, fieldOrEnumType)
  }
}

module.exports = createValueValidatorForFieldOrEnumType
