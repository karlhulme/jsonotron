const check = require('check-types')
const { JsonotronFieldTypeValidationError } = require('jsonotron-errors')
const createJsonSchemaForFieldTypeArray = require('./createJsonSchemaForFieldTypeArray')

/**
 * Returns a validator function for the given field type array.  The validator
 * function is created (compiled) by the given Ajv function by resolving
 * any required field types.  If the JSON is invalid it will fail to
 * compile and an error will be raised.
 * @param {Object} ajv A JSON schema validator.
 * @param {Array} fieldTypes An array of field types.
 * @param {String} fieldTypeName A field type name.
 */
const createFieldTypeArrayValueValidator = (ajv, fieldTypes, fieldTypeName) => {
  check.assert.string(fieldTypeName)

  try {
    const fieldValueSchema = createJsonSchemaForFieldTypeArray(fieldTypes, fieldTypeName)
    return ajv.compile(fieldValueSchema)
  } catch (err) {
    throw new JsonotronFieldTypeValidationError(fieldTypeName,
      `Unable to create field value validator for '${fieldTypeName}'.\n${err.toString()}`)
  }
}

module.exports = createFieldTypeArrayValueValidator
