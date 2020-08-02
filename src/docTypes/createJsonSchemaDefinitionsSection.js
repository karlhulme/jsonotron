const { JsonotronInternalError } = require('jsonotron-errors')
const { getJsonSchemaFragmentForFieldType } = require('../fieldTypes')

/**
 * Builds the 'definitions' section of a JSON schema for the given field types.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} referencedFieldTypeNames An array of referenced field type names.
 */
function createJsonSchemaDefinitionsSection (fieldTypes, referencedFieldTypeNames) {
  const definitions = {}

  for (const fieldTypeName of referencedFieldTypeNames) {
    const fieldType = fieldTypes.find(ft => ft.name === fieldTypeName)

    if (typeof fieldType !== 'object' || fieldType === null) {
      throw new JsonotronInternalError(`Unable to find referenced field type '${fieldTypeName}'.`)
    }

    definitions[fieldTypeName] = getJsonSchemaFragmentForFieldType(fieldType)
  }

  return definitions
}

module.exports = createJsonSchemaDefinitionsSection
