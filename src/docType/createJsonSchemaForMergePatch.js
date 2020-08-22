const check = require('check-types')
const { propFilter, propMap } = require('../utils')
const { createJsonSchemaForFieldBlock } = require('../blocks')

/**
 * Returns a JSON Schema for validating a merge patch.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 */
function createJsonSchemaForMergePatch (docType, fieldTypes, enumTypes) {
  check.assert.object(docType)
  check.assert.array.of.object(fieldTypes)
  check.assert.array.of.object(enumTypes)

  const patchableFields = propFilter(docType.fields, prop => prop.canUpdate)
  const block = propMap(patchableFields, prop => ({ type: prop.type, isArray: prop.isArray }))

  return createJsonSchemaForFieldBlock(
    `Doc Type "${docType.name}" Merge Patch`,
    block,
    fieldTypes,
    enumTypes,
    true
  )
}

module.exports = createJsonSchemaForMergePatch
