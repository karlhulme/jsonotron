const check = require('check-types')
const { propFilter, propMap } = require('../utils')
const createJsonSchemaForFieldBlock = require('./createJsonSchemaForFieldBlock')

/**
 * Returns a JSON Schema for validating the parameters of a constructor.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 */
function createJsonSchemaForConstructorParameters (docType, fieldTypes, enumTypes) {
  check.assert.object(docType)
  check.assert.array.of.object(fieldTypes)
  check.assert.array.of.object(enumTypes)

  const patchableFields = propFilter(docType.fields, prop => prop.canUpdate)
  const block = propMap(patchableFields, prop => ({ type: prop.type }))

  return createJsonSchemaForFieldBlock(
    `Doc Type "${docType.name}" Constructor`,
    {
      ...docType.ctor.parameters,
      ...block
    },
    fieldTypes,
    enumTypes
  )
}

module.exports = createJsonSchemaForConstructorParameters
