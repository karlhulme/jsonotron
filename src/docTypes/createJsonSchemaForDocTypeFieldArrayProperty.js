const check = require('check-types')

/**
 * Create an array property node for a json schema.
 * @param {String} fieldTypeName The name of a field type.
 * @param {String} definitionsPath The path to the field definitions.
 */
function createJsonSchemaForDocTypeFieldArrayProperty (fieldTypeName, definitionsPath) {
  check.assert.string(fieldTypeName)
  check.assert.string(definitionsPath)

  return {
    type: 'array',
    items: { $ref: `${definitionsPath}${fieldTypeName}` }
  }
}

module.exports = createJsonSchemaForDocTypeFieldArrayProperty
