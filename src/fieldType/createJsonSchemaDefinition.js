const check = require('check-types')
const { consts } = require('../utils')
const { createJsonSchemaFragmentForEnumType } = require('../enumType')
const createJsonSchemaFragmentForFieldType = require('./createJsonSchemaFragmentForFieldType')
const determineReferencedTypeNames = require('./determineReferencedTypeNames')

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

  const referencedTypeNames = determineReferencedTypeNames(fieldTypeNames, enumTypeNames, fieldTypes, enumTypes)

  const defs = {}

  for (const fieldTypeName of referencedTypeNames.fieldTypeNames) {
    const fieldType = fieldTypes.find(ft => ft.name === fieldTypeName)
    defs[fieldTypeName] = createJsonSchemaFragmentForFieldType(fieldType, consts.JSON_SCHEMA_DEFINITIONS_PATH)
  }

  for (const enumTypeName of referencedTypeNames.enumTypeNames) {
    const enumType = enumTypes.find(ft => ft.name === enumTypeName)
    defs[enumTypeName] = createJsonSchemaFragmentForEnumType(enumType)
  }

  return defs
}

module.exports = createJsonSchemaDefinition
