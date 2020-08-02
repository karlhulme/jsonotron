const check = require('check-types')
const { getReferencedFieldTypeNames } = require('../fieldTypes')
const createJsonSchemaForDocTypeFieldArrayProperty = require('./createJsonSchemaForDocTypeFieldArrayProperty')
const createJsonSchemaDefinitionsSection = require('./createJsonSchemaDefinitionsSection')
const createJsonSchemaForDocTypeFieldNonArrayProperty = require('./createJsonSchemaForDocTypeFieldNonArrayProperty')

/**
 * Returns a list of the field type names that are directly referenced
 * by the updatable fields on the given doc type.
 * @param {Object} docType A doc type.
 */
function getDirectlyReferencedFieldTypeNamesFromDocTypeUpdateFields (docType) {
  check.assert.object(docType.fields)

  const directlyReferencedFieldTypeNames = []

  for (const fieldName in docType.fields) {
    const field = docType.fields[fieldName]

    if (field.canUpdate && !directlyReferencedFieldTypeNames.includes(field.type)) {
      directlyReferencedFieldTypeNames.push(field.type)
    }
  }

  return directlyReferencedFieldTypeNames
}

/**
 * Builds the 'properties' section of an Update JSON schema for the given doc type.
 * @param {Object} docType A doc type.
 * @param {String} definitionsPath The path to the field definitions.
 */
function createJsonSchemaPropertiesSectionForDocTypeUpdateFields (docType, definitionsPath) {
  check.assert.object(docType.fields)

  const properties = {}

  for (const fieldName in docType.fields) {
    const field = docType.fields[fieldName]

    if (field.canUpdate) {
      properties[fieldName] = field.isArray
        ? createJsonSchemaForDocTypeFieldArrayProperty(field.type, definitionsPath)
        : createJsonSchemaForDocTypeFieldNonArrayProperty(field.type, definitionsPath)
    }
  }

  return properties
}

/**
 * Creates a JSON Schema for merge patches for the given doc type.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 * @param {Boolean} [fragment] True if the $schema property should be omitted from the result.
 * @param {String} [externalDefs] A path to external definitions.  If supplied, then
 * the definitions property will omitted from the result.
 */
function createJsonSchemaForDocTypeMergePatch (docType, fieldTypes, fragment, externalDefs) {
  check.assert.object(docType)
  check.assert.string(docType.title)
  check.assert.array.of.object(fieldTypes)

  const definitionsInternalPath = '#/definitions/'
  const definitionsPath = typeof externalDefs === 'string' && externalDefs.length > 0 ? externalDefs : definitionsInternalPath

  const properties = createJsonSchemaPropertiesSectionForDocTypeUpdateFields(docType, definitionsPath)

  const schema = {
    title: `${docType.title} "Merge Patch" JSON Schema`,
    type: 'object',
    additionalProperties: false,
    properties
  }

  if (!fragment) {
    schema.$schema = 'http://json-schema.org/draft-07/schema#'
  }

  if (definitionsPath === definitionsInternalPath) {
    const directlyReferencedFieldTypeNames = getDirectlyReferencedFieldTypeNamesFromDocTypeUpdateFields(docType)
    const referencedFieldTypeNames = getReferencedFieldTypeNames(fieldTypes, directlyReferencedFieldTypeNames)
    schema.definitions = createJsonSchemaDefinitionsSection(fieldTypes, referencedFieldTypeNames)
  }

  return schema
}

module.exports = createJsonSchemaForDocTypeMergePatch
