const check = require('check-types')
const createJsonSchemaForDocTypeFunctionParameters = require('./createJsonSchemaForDocTypeFunctionParameters')
const getConstructorParameters = require('./getConstructorParameters')

/**
 * Creates a JSON schema for the constructor parameters of a given document type.
 * @param {Object} docType A document type.
 * @param {Array} fieldTypes An array of field types.
 * @param {Boolean} [fragment] True if the $schema property should be omitted from the result.
 * @param {String} [externalDefs] A path to external definitions.  If supplied, then
 * the definitions property will omitted from the result.
 */
function createJsonSchemaForDocTypeConstructorParameters (docType, fieldTypes, fragment, externalDefs) {
  check.assert.object(docType)
  check.assert.array.of.object(fieldTypes)

  const constructorParameters = getConstructorParameters(docType)
  return createJsonSchemaForDocTypeFunctionParameters(docType, 'Constructor', constructorParameters, fieldTypes, fragment, externalDefs)
}

module.exports = createJsonSchemaForDocTypeConstructorParameters
