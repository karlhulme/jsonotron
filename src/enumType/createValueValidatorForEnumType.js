const check = require('check-types')
const createJsonSchemaForEnumType = require('./createJsonSchemaForEnumType')

/**
 * Returns a validator function for the given enum type.
 * @param {Object} ajv A JSON schema validator.
 * @param {String} enumType An enum type.
 */
function createValueValidatorForEnumType (ajv, enumType) {
  check.assert.object(ajv)
  check.assert.object(enumType)

  const enumValueSchema = createJsonSchemaForEnumType(enumType)
  return ajv.compile(enumValueSchema)
}

module.exports = createValueValidatorForEnumType
