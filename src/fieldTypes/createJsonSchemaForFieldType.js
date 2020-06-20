const check = require('check-types')
const { JsonotronFieldTypeResolutionError } = require('jsonotron-errors')
const getJsonSchemaFragmentForFieldType = require('./getJsonSchemaFragmentForFieldType')
const getReferencedFieldTypeNames = require('./getReferencedFieldTypeNames')

/**
 * Creates a JSON Schema for the given field type.
 * @param {Array} fieldTypes An array of field types.
 * @param {String} fieldTypeName The name of a field type.
 * @param {Boolean} [fragment] True if the $schema property should be omitted from the result.
 * @param {String} [externalDefs] A path to external definitions.  If supplied, then
 * the definitions property will omitted from the result.
 */
const createJsonSchemaForFieldType = (fieldTypes, fieldTypeName, fragment, externalDefs) => {
  check.assert.array.of.object(fieldTypes)
  check.assert.string(fieldTypeName)
  check.assert.maybe.boolean(fragment)
  check.assert.maybe.string(externalDefs)

  const fieldType = fieldTypes.find(ft => ft.name === fieldTypeName)

  if (typeof fieldType !== 'object' || fieldType === null) {
    throw new JsonotronFieldTypeResolutionError(fieldTypeName)
  }

  const definitionsInternalPath = '#/definitions/'
  const definitionsPath = typeof externalDefs === 'string' && externalDefs.length > 0 ? externalDefs : definitionsInternalPath

  const schema = {
    title: `${fieldType.title} JSON Schema`,
    ...getJsonSchemaFragmentForFieldType(fieldType, definitionsPath)
  }

  if (!fragment) {
    schema.$schema = 'http://json-schema.org/draft-07/schema#'
  }

  if (definitionsPath === definitionsInternalPath) {
    const refFieldTypeNames = getReferencedFieldTypeNames(fieldTypes, fieldType.referencedFieldTypes || [])

    schema.definitions = refFieldTypeNames.reduce((acc, cur) => {
      const refFieldType = fieldTypes.find(ft => ft.name === cur)

      acc[cur] = getJsonSchemaFragmentForFieldType(refFieldType, definitionsPath)

      return acc
    }, {})
  }

  return schema
}

module.exports = createJsonSchemaForFieldType
