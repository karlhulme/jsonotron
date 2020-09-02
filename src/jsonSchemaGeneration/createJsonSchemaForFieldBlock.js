import check from 'check-types'
import { JSON_SCHEMA_DECLARATION, JSON_SCHEMA_DEFINITIONS_PATH } from '../shared'
import { createJsonSchemaDefinitionsSection } from './createJsonSchemaDefinitionsSection'

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
  const refFieldTypes = []
  const refEnumTypes = []

  for (const fieldName in fieldBlock.fields) {
    const field = fieldBlock.fields[fieldName]

    if (field.const) {
      // no definition required for constants
    } else {
      const isFieldASchemaType = schemaTypes.findIndex(st => st.name === field.type) > -1
      const isFieldAnEnumType = enumTypes.findIndex(et => et.name === field.type) > -1

      if (isFieldASchemaType && !refFieldTypes.includes(field.type)) {
        refFieldTypes.push(field.type)
      }

      if (isFieldAnEnumType && !refEnumTypes.includes(field.type)) {
        refEnumTypes.push(field.type)
      }
    }
  }

  return createJsonSchemaDefinitionsSection(refFieldTypes, refEnumTypes, schemaTypes, enumTypes)
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
