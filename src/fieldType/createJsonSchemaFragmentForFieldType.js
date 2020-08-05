const check = require('check-types')

/**
 * Returns the JSON schema fragment of the given field type.
 * This will be the local fragment only, it will not include
 * any referenced dependencies.
 * @param {Object} fieldType A field type.
 * @param {String} definitionsPath The path to any referenced field definitions,
 * usually #/definitions/.
 */
function createJsonSchemaFragmentForFieldType (fieldType, definitionsPath) {
  check.assert.object(fieldType)
  check.assert.maybe.string(definitionsPath)

  if (typeof fieldType.jsonSchema === 'function') {
    return fieldType.jsonSchema(definitionsPath)
  } else {
    return JSON.parse(JSON.stringify(fieldType.jsonSchema))
  }
}

module.exports = createJsonSchemaFragmentForFieldType
