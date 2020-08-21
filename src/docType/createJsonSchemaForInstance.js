const check = require('check-types')
const { createJsonSchemaForFieldBlock } = require('../fieldBlock')

/**
 * Returns a JSON Schema for validating an instance of a doc type.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 * @param {Boolean} includeSys True if the system fields (id, docType, docVersion and docHeader)
 * should be included within the schema.
 */
function createJsonSchemaForInstance (docType, fieldTypes, enumTypes, includeSystemFields) {
  check.assert.object(docType)
  check.assert.array.of.object(fieldTypes)
  check.assert.array.of.object(enumTypes)

  const sysFields = includeSystemFields
    ? {
      id: { type: 'sysId', isRequired: true },
      docType: { const: docType.name, isRequired: true },
      docVersion: { type: 'sysDocVersion' },
      docHeader: { type: 'sysDocHeader', isRequired: true }
    }
    : {}

  return createJsonSchemaForFieldBlock(
    `Doc Type "${docType.name}"`,
    {
      ...sysFields,
      ...docType.fields
    },
    fieldTypes,
    enumTypes
  )
}

module.exports = createJsonSchemaForInstance
