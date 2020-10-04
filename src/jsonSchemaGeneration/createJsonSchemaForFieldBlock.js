import check from 'check-types'
import { JSON_SCHEMA_DECLARATION, JSON_SCHEMA_DEFINITIONS_PATH } from '../shared/index.js'
import { createJsonSchemaDefinitionsSection } from './createJsonSchemaDefinitionsSection.js'

/**
 * Build the properties object.
 * @param {Object} fieldBlock A block of field declarations.
 */
function buildPropertiesObject (fieldBlock) {
  const properties = {}

  for (const fieldName in fieldBlock.fields) {
    const field = fieldBlock.fields[fieldName]

    if (field.const) {
      properties[fieldName] = { enum: [field.const] }
    } else {
      properties[fieldName] = field.isArray
        ? field.isNullable
          ? { type: ['array', 'null'], items: { $ref: JSON_SCHEMA_DEFINITIONS_PATH + field.type } }
          : { type: 'array', items: { $ref: JSON_SCHEMA_DEFINITIONS_PATH + field.type } }
        : field.isNullable
          ? { oneOf: [{ type: 'null' }, { $ref: JSON_SCHEMA_DEFINITIONS_PATH + field.type }] }
          : { $ref: JSON_SCHEMA_DEFINITIONS_PATH + field.type }
    }
  }

  return properties
}

/**
 * Build the array of required field names.
 * @param {Object} fieldBlock A block of field declarations.
 */
function buildRequiredArray (fieldBlock) {
  const required = []

  for (const fieldName in fieldBlock.fields) {
    const field = fieldBlock.fields[fieldName]

    if (field.isRequired) {
      required.push(fieldName)
    }
  }

  return required
}

/**
 * Build the definitions object.
 * @param {Object} fieldBlock A block of field declarations.
 * @param {Array} schemaTypes An array of schema types.
 * @param {Array} enumTypes An array of enum types.
 */
function buildDefinitionsBlock (fieldBlock, schemaTypes, enumTypes) {
  const typeNames = Object.keys(fieldBlock.fields)
    .filter(fieldName => !fieldBlock.fields[fieldName].const) // filter out constants
    .map(fieldName => fieldBlock.fields[fieldName].type)

  return createJsonSchemaDefinitionsSection(typeNames, schemaTypes, enumTypes)
}

/**
 * Creates a JSON Schema for the given block of field declarations.
 * @param {Object} fieldBlock A block of field declaratinons.
 * @param {Array} schemaTypes An array of schema types.
 * @param {Array} enumTypes An array of enum types.
 */
export function createJsonSchemaForFieldBlock (fieldBlock, schemaTypes, enumTypes) {
  check.assert.object(fieldBlock)
  check.assert.string(fieldBlock.name)
  check.assert.array.of.object(schemaTypes)
  check.assert.array.of.object(enumTypes)

  return {
    $schema: JSON_SCHEMA_DECLARATION,
    title: fieldBlock.name,
    type: 'object',
    properties: buildPropertiesObject(fieldBlock),
    required: buildRequiredArray(fieldBlock),
    definitions: buildDefinitionsBlock(fieldBlock, schemaTypes, enumTypes)
  }
}
