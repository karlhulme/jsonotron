const check = require('check-types')
const createJsonSchemaForEnumTypeArray = require('./createJsonSchemaForEnumTypeArray')

/**
 * Returns a validator function for the given enum type array.
 * @param {Object} ajv A JSON schema validator.
 * @param {String} enumType An enum type.
 */
function createValueValidatorForEnumTypeArray (ajv, enumType) {
  check.assert.object(ajv)
  check.assert.object(enumType)

  const enumValueSchema = createJsonSchemaForEnumTypeArray(enumType)
  return ajv.compile(enumValueSchema)
}

module.exports = createValueValidatorForEnumTypeArray
