const check = require('check-types')
const { JsonotronFieldTypeValidationError } = require('jsonotron-errors')
const createJsonSchemaForFieldType = require('./createJsonSchemaForFieldType')

/**
 * Returns a validator function for the given field type.  The validator
 * function is created (compiled) by the given Ajv function by resolving
 * any required field types.  If the JSON is invalid it will fail to
 * compile and an error will be raised.
 * @param {Object} ajv A JSON schema validator.
 * @param {String} fieldType A field type.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 */
function createValueValidatorForFieldType (ajv, fieldType, fieldTypes, enumTypes) {
  check.assert.object(ajv)
  check.assert.object(fieldType)
  check.assert.string(fieldType.name)
  check.assert.array.of.object(fieldTypes)
  check.assert.array.of.object(enumTypes)

  try {
    const fieldValueSchema = createJsonSchemaForFieldType(fieldType, fieldTypes, enumTypes)
    return ajv.compile(fieldValueSchema)
  } catch (err) {
    throw new JsonotronFieldTypeValidationError(fieldType.name,
      `Unable to create field value validator for '${fieldType.name}'.\n${err.toString()}`)
  }
}

module.exports = createValueValidatorForFieldType
