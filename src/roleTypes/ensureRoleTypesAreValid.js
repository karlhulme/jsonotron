const check = require('check-types')
const { JsonotronRoleTypeValidationError } = require('jsonotron-errors')
const { roleTypeSchema } = require('../schemas')

/**
 * Raises an error if the role type fails to conform to the roleTypeSchema.
 * @param {Object} ajv A JSON schema validator.
 * @param {String} roleType A role type.
 */
function ensureRoleTypeAgainstRoleTypeSchema (ajv, roleType) {
  check.assert.object(ajv)
  check.assert.string(roleType.name)

  const roleTypeSchemaValidator = ajv.compile(roleTypeSchema)

  if (!roleTypeSchemaValidator(roleType)) {
    throw new JsonotronRoleTypeValidationError(roleType.name,
      `Unable to validate against roleTypeSchema.\n${JSON.stringify(roleTypeSchemaValidator.errors, null, 2)}`)
  }
}

/**
 * Raises an error if the given role type is not valid.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} roleType A role type.
 */
function ensureRoleTypeIsValid (ajv, roleType) {
  ensureRoleTypeAgainstRoleTypeSchema(ajv, roleType)
}

/**
 * Raises an error if any of the given role types are not valid.
 * A valid role type will conform to the roleTypeSchema.
 * @param {Object} ajv A json validator.
 * @param {Array} roleTypes An array of role types.
 */
function ensureRoleTypesAreValid (ajv, roleTypes) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.array.of.object(roleTypes)

  for (let i = 0; i < roleTypes.length; i++) {
    ensureRoleTypeIsValid(ajv, roleTypes[i])
  }
}

module.exports = ensureRoleTypesAreValid
