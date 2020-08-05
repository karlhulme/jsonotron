const check = require('check-types')
const { consts } = require('../utils')
const { createJsonSchemaFragmentForEnumType } = require('../enumType')
const createJsonSchemaFragmentForFieldType = require('./createJsonSchemaFragmentForFieldType')
const getReferencedFieldAndEnumTypeNames = require('./getReferencedFieldAndEnumTypeNames')

/**
 * Creates the definitions portion of a JSON Schema that includes the
 * json schemas defined for the given fieldTypeNames and enumTypeNames.
 * @param {Array} fieldTypeNames An array of field type names.
 * @param {Array} fieldTypeNames An array of enum type names.
 * @param {Array} fieldTypes An array of field types that may be referenced by the named field types.
 * @param {Array} enumTypes An array of enum types that may be referenced by the named field types.
 */
function createJsonSchemaDefinition (fieldTypeNames, enumTypeNames, fieldTypes, enumTypes) {
  check.assert.array.of.string(fieldTypeNames)
  check.assert.array.of.string(enumTypeNames)
  check.assert.array.of.object(fieldTypes)
  check.assert.array.of.object(enumTypes)

  const refFieldTypeNames = getReferencedFieldAndEnumTypeNames(fieldTypeNames.concat(enumTypeNames), fieldTypes, enumTypes)

  return refFieldTypeNames.reduce((acc, cur) => {
    const refFieldType = fieldTypes.find(ft => ft.name === cur)
    const refEnumType = enumTypes.find(et => et.name === cur)

    if (refFieldType) {
      acc[cur] = createJsonSchemaFragmentForFieldType(refFieldType, consts.JSON_SCHEMA_DEFINITIONS_PATH)
    } else {
      acc[cur] = createJsonSchemaFragmentForEnumType(refEnumType)
    }

    return acc
  }, {})
}

module.exports = createJsonSchemaDefinition
