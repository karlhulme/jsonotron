const check = require('check-types')

/**
 * Create a non-array property node for a json schema.
 * @param {String} fieldTypeName The name of a field type.
 * @param {String} definitionsPath The path to the field definitions.
 */
function createJsonSchemaForDocTypeFieldNonArrayProperty (fieldTypeName, definitionsPath) {
  check.assert.string(fieldTypeName)
  check.assert.string(definitionsPath)

  return {
    $ref: `${definitionsPath}${fieldTypeName}`
  }
}

module.exports = createJsonSchemaForDocTypeFieldNonArrayProperty
