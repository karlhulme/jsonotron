const check = require('check-types')
const createJsonSchemaForDocTypeFunctionParameters = require('./createJsonSchemaForDocTypeFunctionParameters')
const getConstructorParameters = require('./getConstructorParameters')

/**
 * Creates a JSON schema for the constructor parameters of a given document type.
 * @param {Object} docType A document type.
 * @param {Array} fieldTypes An array of field types.
 */
function createJsonSchemaForDocTypeConstructorParameters (docType, fieldTypes) {
  check.assert.object(docType)
  check.assert.array.of.object(fieldTypes)

  const parameters = {
    ...getConstructorParameters(docType)
  }

  for (const fieldName in docType.fields) {
    const field = docType.fields[fieldName]

    if (field.canUpdate) {
      parameters[fieldName] = { type: field.type, isArray: field.isArray }
    }
  }

  return createJsonSchemaForDocTypeFunctionParameters(docType, 'Constructor', parameters, fieldTypes)
}

module.exports = createJsonSchemaForDocTypeConstructorParameters
