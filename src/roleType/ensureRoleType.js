const check = require('check-types')
const { JsonotronRoleTypeValidationError } = require('jsonotron-errors')
const { roleTypeSchema } = require('../schemas')
const { pascalToTitleCase } = require('../utils')

/**
 * Raises an error if the given role type does not conform to the roleTypeSchema.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} roleType A role type.
 */
function validateRoleTypeWithSchema (ajv, roleType) {
  const validator = ajv.compile(roleTypeSchema)

  if (!validator(roleType)) {
    throw new JsonotronRoleTypeValidationError(roleType.name,
      `Unable to validate against roleTypeSchema.\n${JSON.stringify(validator.errors, null, 2)}`)
  }
}

/**
 * Patches any missing/optional fields.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} roleType A role type object to check for validity.
 */
function patchRoleType (roleType) {
  if (typeof roleType.title === 'undefined') {
    roleType.title = pascalToTitleCase(roleType.name)
  }

  if (typeof roleType.docPermissions === 'undefined') {
    roleType.docPermissions = {}
  }

  if (typeof roleType.docPermissions === 'object') {
    for (const docTypeName in roleType.docPermissions) {
      const spec = roleType.docPermissions[docTypeName]

      // query spec
      if (typeof spec.query === 'undefined') {
        spec.query = false
      } else if (typeof spec.query === 'object') {
        if (typeof spec.query.fieldsTreatment === 'undefined') {
          spec.query.fieldsTreatment = 'whitelist'
        }

        if (typeof spec.query.fields === 'undefined') {
          spec.query.fields = []
        }
      }

      // update spec
      if (typeof spec.update === 'undefined') {
        spec.update = false
      } else if (typeof spec.update === 'object') {
        if (typeof spec.update.patch === 'undefined') {
          spec.update.patch = false
        }

        if (typeof spec.update.operations === 'undefined') {
          spec.update.operations = []
        }
      }

      // create spec
      if (typeof spec.create === 'undefined') {
        spec.create = false
      }

      // delete spec
      if (typeof spec.delete === 'undefined') {
        spec.delete = false
      }

      // replace spec
      if (typeof spec.replace === 'undefined') {
        spec.replace = false
      }
    }
  }
}

/**
 * Raises an error if the given role type is not valid, otherwise it
 * patches in any missing/optional fields.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} roleType A role type.
 */
function ensureRoleType (ajv, roleType) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.object(roleType)

  validateRoleTypeWithSchema(ajv, roleType)
  patchRoleType(roleType)
}

module.exports = ensureRoleType