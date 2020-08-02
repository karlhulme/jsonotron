const check = require('check-types')
const { getReferencedFieldTypeNames } = require('../fieldTypes')
const createJsonSchemaDefinitionsSection = require('./createJsonSchemaDefinitionsSection')

/**
 * Returns a list of the field type names that are directly referenced
 * by the fields on the given parameter block.
 * @param {Objec} docType a doc type.
 * @param {Object} functionParameters A parameter block.
 */
function getDirectlyReferencedFieldTypeNamesFromFunctionParameters (docType, functionParameters) {
  const directlyReferencedFieldTypeNames = []

  for (const parameterName in functionParameters) {
    const parameter = functionParameters[parameterName]

    if (!directlyReferencedFieldTypeNames.includes(parameter.type)) {
      directlyReferencedFieldTypeNames.push(parameter.type)
    }
  }

  return directlyReferencedFieldTypeNames
}

/**
 * Create a non-array property node for a json schema.
 * @param {String} fieldTypeName The name of a field type.
 * @param {String} definitionsPath The path to the field definitions.
 */
function createNamedJsonSchemaNonArrayProperty (fieldTypeName, definitionsPath) {
  return {
    $ref: `${definitionsPath}${fieldTypeName}`
  }
}

/**
 * Create an array property node for a json schema.
 * @param {String} fieldTypeName The name of a field type.
 * @param {String} definitionsPath The path to the field definitions.
 */
function createNamedJsonSchemaArrayProperty (fieldTypeName, definitionsPath) {
  return {
    type: 'array',
    items: { $ref: `${definitionsPath}${fieldTypeName}` }
  }
}

/**
 * Builds the 'properties' section of a JSON schema for the given doc type.
 * @param {Object} docType a doc type.
 * @param {Object} functionParameters A parameter block.
 * @param {String} definitionsPath The path to the field definitions.
 */
function buildPropertiesSectionForDocTypeFunctionParameters (docType, functionParameters, definitionsPath) {
  const properties = {}

  for (const parameterName in functionParameters) {
    const parameter = functionParameters[parameterName]

    properties[parameterName] = parameter.isArray
      ? createNamedJsonSchemaArrayProperty(parameter.type, definitionsPath)
      : createNamedJsonSchemaNonArrayProperty(parameter.type, definitionsPath)
  }

  return properties
}

/**
 * Builds the 'required' section of a JSON schema for the given parameter block.
 * @param {Object} functionParameters A parameter block.
 */
function buildRequiredSectionForDocTypeFunctionParameters (functionParameters) {
  const required = []

  for (const parameterName in functionParameters) {
    const parameter = functionParameters[parameterName]

    if (parameter.isRequired) {
      required.push(parameterName)
    }
  }

  return required
}

/**
 * Creates a JSON Schema for the given doc type.
 * @param {Object} docType A doc type.
 * @param {String} subTitle A sub title to appear in the title of the schema.
 * @param {Object} functionParameters A parameter block.
 * @param {Array} fieldTypes An array of field types.
 */
function createJsonSchemaForDocTypeFunctionParameters (docType, subTitle, functionParameters, fieldTypes) {
  check.assert.object(docType)
  check.assert.string(subTitle)
  check.assert.object(functionParameters)
  check.assert.array.of.object(fieldTypes)

  const definitionsPath = '#/definitions/'

  const properties = buildPropertiesSectionForDocTypeFunctionParameters(docType, functionParameters, definitionsPath)
  const required = buildRequiredSectionForDocTypeFunctionParameters(functionParameters)

  const schema = {
    title: `Doc Type "${docType.name}" (${subTitle})`,
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    properties,
    required
  }

  const directlyReferencedFieldTypeNames = getDirectlyReferencedFieldTypeNamesFromFunctionParameters(docType, functionParameters)
  const referencedFieldTypeNames = getReferencedFieldTypeNames(fieldTypes, directlyReferencedFieldTypeNames)
  schema.definitions = createJsonSchemaDefinitionsSection(fieldTypes, referencedFieldTypeNames)

  return schema
}

module.exports = createJsonSchemaForDocTypeFunctionParameters
