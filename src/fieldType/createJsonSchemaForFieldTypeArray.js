const check = require('check-types')
const createJsonSchemaFragmentForFieldType = require('./createJsonSchemaFragmentForFieldType')
const createJsonSchemaDefinition = require('./createJsonSchemaDefinition')
const { consts } = require('../utils')

/**
 * Creates a JSON Schema for the given field type.
 * @param {Object} fieldType A field type.
 * @param {Array} fieldTypes An array of field types that may be referenced by the given field type.
 * @param {Array} enumTypes An array of enum types that may be referenced by the given field type.
 */
function createJsonSchemaForFieldTypeArray (fieldType, fieldTypes, enumTypes) {
  check.assert.object(fieldType)
  check.assert.string(fieldType.name)
  check.assert.array.of.object(fieldTypes)
  check.assert.array.of.object(enumTypes)

  return {
    $schema: consts.JSON_SCHEMA_DECLARATION,
    title: `Array of Field Type "${fieldType.name}"`,
    type: 'array',
    items: {
      ...createJsonSchemaFragmentForFieldType(fieldType, consts.JSON_SCHEMA_DEFINITIONS_PATH)
    },
    definitions: createJsonSchemaDefinition(fieldType.referencedFieldTypes, fieldType.referencedEnumTypes, fieldTypes, enumTypes)
  }
}

module.exports = createJsonSchemaForFieldTypeArray
