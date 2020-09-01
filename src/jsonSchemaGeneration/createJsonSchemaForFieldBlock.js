import check from 'check-types'
import { consts } from '../utils'
import { createJsonSchemaDefinitionsSection } from './createJsonSchemaDefinitionsSection'

/**
 * Build the properties object.
 * @param {Object} fieldBlock A block of field declarations.
 * @param {Boolean} isNullable True if the property values can be null.
 */
function buildPropertiesObject (fieldBlock, isNullable) {
  const properties = {}

  for (const fieldName in fieldBlock) {
    const field = fieldBlock[fieldName]

    if (field.const) {
      properties[fieldName] = { enum: [field.const] }
    } else {
      properties[fieldName] = field.isArray
        ? isNullable
          ? { type: ['array', 'null'], items: { $ref: consts.JSON_SCHEMA_DEFINITIONS_PATH + field.type } }
          : { type: 'array', items: { $ref: consts.JSON_SCHEMA_DEFINITIONS_PATH + field.type } }
        : isNullable
          ? { oneOf: [{ type: 'null' }, { $ref: consts.JSON_SCHEMA_DEFINITIONS_PATH + field.type }] }
          : { $ref: consts.JSON_SCHEMA_DEFINITIONS_PATH + field.type }
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

  for (const fieldName in fieldBlock) {
    const field = fieldBlock[fieldName]

    if (field.isRequired || field.isGuaranteed) {
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

  for (const fieldName in fieldBlock) {
    const field = fieldBlock[fieldName]

    if (field.type) {
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
 * This also supports non-field declarations such as { const: 'value' }
 * and { any: true }.
 * @param {String} title The title to be applied to the returned schema.
 * @param {Object} fieldBlock A block of field declaratinons.
 * @param {Array} schemaTypes An array of schema types.
 * @param {Array} enumTypes An array of enum types.
 * @param {Boolean} isNullable True if the property values can be null.
 */
export function createJsonSchemaForFieldBlock (title, fieldBlock, schemaTypes, enumTypes, isNullable) {
  check.assert.string(title)
  check.assert.object(fieldBlock)
  check.assert.array.of.object(schemaTypes)
  check.assert.array.of.object(enumTypes)

  return {
    $schema: consts.JSON_SCHEMA_DECLARATION,
    title,
    type: 'object',
    properties: buildPropertiesObject(fieldBlock, isNullable),
    required: buildRequiredArray(fieldBlock),
    definitions: buildDefinitionsBlock(fieldBlock, schemaTypes, enumTypes)
  }
}
