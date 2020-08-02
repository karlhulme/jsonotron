const check = require('check-types')
const { getReferencedFieldTypeNames } = require('../fieldTypes')
const createJsonSchemaForDocTypeFieldArrayProperty = require('./createJsonSchemaForDocTypeFieldArrayProperty')
const createJsonSchemaDefinitionsSection = require('./createJsonSchemaDefinitionsSection')
const createJsonSchemaForDocTypeFieldNonArrayProperty = require('./createJsonSchemaForDocTypeFieldNonArrayProperty')

/**
 * Returns a list of the field type names that are directly referenced
 * by the fields on the given doc type.
 * @param {Object} docType A doc type.
 * @param {Boolean} includeSys True if the schema should include the sys property.
 */
function getDirectlyReferencedFieldTypeNamesFromDocTypeFields (docType, includeSys) {
  check.assert.object(docType.fields)

  const directlyReferencedFieldTypeNames = ['sysId']

  if (includeSys) {
    directlyReferencedFieldTypeNames.push('sysDateTime', 'sysOpId', 'sysUserIdentity', 'sysVersion')
  }

  for (const fieldName in docType.fields) {
    const field = docType.fields[fieldName]

    if (!directlyReferencedFieldTypeNames.includes(field.type)) {
      directlyReferencedFieldTypeNames.push(field.type)
    }
  }

  return directlyReferencedFieldTypeNames
}

/**
 * Create a JSON schema for the sys property.
 * @param {String} definitionsPath The path to the field definitions.
 */
function createJsonSchemaForSysProperty (definitionsPath) {
  return {
    type: 'object',
    properties: {
      // An object that describes the origin of the document
      origin: {
        type: 'object',
        additionalProperties: false,
        properties: {
          // A value of 'new' if the document was created using the constructor, otherwise 'replace'.
          style: { enum: ['new', 'replace'] },
          userIdentity: { $ref: `${definitionsPath}sysUserIdentity` },
          dateTime: { $ref: `${definitionsPath}sysDateTime` }
        },
        required: ['style', 'userIdentity', 'dateTime']
      },
      // An object that describes the last time the document was updated.
      updated: {
        type: 'object',
        additionalProperties: false,
        properties: {
          userIdentity: { $ref: `${definitionsPath}sysUserIdentity` },
          dateTime: { $ref: `${definitionsPath}sysDateTime` }
        },
        required: ['userIdentity', 'dateTime']
      },
      // An object that describes the last X operations on the document.
      ops: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            opId: { $ref: `${definitionsPath}sysOpId` },
            userIdentity: { $ref: `${definitionsPath}sysUserIdentity` },
            dateTime: { $ref: `${definitionsPath}sysDateTime` },
            style: { enum: ['patch', 'operation'] },
            operationName: { type: 'string' }
          },
          additionalProperties: false,
          required: ['opId', 'userIdentity', 'dateTime', 'style']
        }
      },
      // An object that contains calculated field values as determined at the last update - might be used by filters.
      calcs: {
        type: 'object',
        additionalProperties: {
          type: 'object',
          additionalProperties: false,
          properties: {
            value: {}
          }
        }
      }
    },
    required: ['ops', 'calcs']
  }
}

/**
 * Builds the 'properties' section of a JSON schema for the given doc type.
 * Note that while docVersion uses the docVersion type definition, it is not
 * a required field.
 * @param {Object} docType A doc type.
 * @param {String} definitionsPath The path to the field definitions.
 * @param {Boolean} includeSys True if the schema should include the sys property.
 */
function createJsonSchemaPropertiesSectionForDocTypeFields (docType, definitionsPath, includeSys) {
  check.assert.string(docType.name)
  check.assert.object(docType.fields)
  check.assert.boolean(includeSys)

  const properties = {}

  properties.id = { $ref: `${definitionsPath}sysId` }
  properties.docType = { enum: [docType.name] }
  // The version of the current iteration of the document (eTag) that is re-generated on save.
  properties.docVersion = {}

  if (includeSys) {
    properties.sys = createJsonSchemaForSysProperty(definitionsPath)
  }

  for (const fieldName in docType.fields) {
    const field = docType.fields[fieldName]

    properties[fieldName] = field.isArray
      ? createJsonSchemaForDocTypeFieldArrayProperty(field.type, definitionsPath)
      : createJsonSchemaForDocTypeFieldNonArrayProperty(field.type, definitionsPath)
  }

  return properties
}

/**
 * Builds the 'required' section of a JSON schema for the given doc type.
 * @param {Object} docType A doc type.
 * @param {Boolean} includeSys True if the schema should include the sys property.
 */
function createJsonSchemaRequiredSectionForDocTypeFields (docType, includeSys) {
  check.assert.object(docType.fields)
  check.assert.boolean(includeSys)

  const required = ['id', 'docType']

  if (includeSys) {
    required.push('sys')
  }

  for (const fieldName in docType.fields) {
    const field = docType.fields[fieldName]

    if (field.isRequired) {
      required.push(fieldName)
    }
  }

  return required
}

/**
 * Creates a JSON Schema for docs of the given doc type.
 * @param {Object} docType A doc type.
 * @param {Array} fieldTypes An array of field types.
 * @param {Boolean} [includeSys] True if the schema should include the sys property.
 */
function createJsonSchemaForDocTypeInstance (docType, fieldTypes, includeSys) {
  check.assert.object(docType)
  check.assert.string(docType.name)
  check.assert.array.of.object(fieldTypes)

  const definitionsPath = '#/definitions/'

  const properties = createJsonSchemaPropertiesSectionForDocTypeFields(docType, definitionsPath, includeSys || false)
  const required = createJsonSchemaRequiredSectionForDocTypeFields(docType, includeSys || false)

  const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: `Doc Type "${docType.name}"`,
    type: 'object',
    additionalProperties: true,
    properties,
    required
  }

  if (includeSys) {
    schema.title += ' +sys'
  }

  const directlyReferencedFieldTypeNames = getDirectlyReferencedFieldTypeNamesFromDocTypeFields(docType, includeSys || false)
  const referencedFieldTypeNames = getReferencedFieldTypeNames(fieldTypes, directlyReferencedFieldTypeNames)
  schema.definitions = createJsonSchemaDefinitionsSection(fieldTypes, referencedFieldTypeNames)

  return schema
}

module.exports = createJsonSchemaForDocTypeInstance
