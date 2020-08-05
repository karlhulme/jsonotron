const check = require('check-types')
const createJsonSchemaFragmentForEnumType = require('./createJsonSchemaFragmentForEnumType')
const { consts } = require('../utils')

/**
 * Creates a JSON Schema for the given enum type.
 * @param {String} enumType The name of a field type.
 */
function createJsonSchemaForEnumType (enumType) {
  check.assert.object(enumType)
  check.assert.string(enumType.name)

  return {
    $schema: consts.JSON_SCHEMA_DECLARATION,
    title: `Enum Type "${enumType.name}"`,
    ...createJsonSchemaFragmentForEnumType(enumType)
  }
}

module.exports = createJsonSchemaForEnumType
