import check from 'check-types'
import errors from 'jsonotron-errors'
import { createJsonSchemaForSchemaTypeArray } from './createJsonSchemaForSchemaTypeArray'

/**
 * Returns a validator function for the given schema type array.  The validator
 * function is created (compiled) by the given Ajv function by resolving
 * any required schema types.  If the JSON is invalid it will fail to
 * compile and an error will be raised.
 * @param {Object} ajv A JSON schema validator.
 * @param {String} schemaType A schema type.
 * @param {Array} schemaTypes An array of schema types.
 * @param {Array} enumTypes An array of enum types.
 */
export function createValueValidatorForSchemaTypeArray (ajv, schemaType, schemaTypes, enumTypes) {
  check.assert.object(ajv)
  check.assert.object(schemaType)
  check.assert.string(schemaType.name)
  check.assert.array.of.object(schemaTypes)
  check.assert.array.of.object(enumTypes)

  try {
    const schemaValueSchema = createJsonSchemaForSchemaTypeArray(schemaType, schemaTypes, enumTypes)
    return ajv.compile(schemaValueSchema)
  } catch (err) {
    throw new errors.JsonotronFieldTypeValidationError(schemaType.name,
      `Unable to create schema value array validator for '${schemaType.name}'.\n${err.toString()}`)
  }
}
