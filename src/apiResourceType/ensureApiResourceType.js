const check = require('check-types')
const { JsonotronApiResourceTypeDocumentationMissingError, JsonotronApiResourceTypeValidationError } = require('jsonotron-errors')
const { apiResourceTypeSchema } = require('../schemas')

/**
 * Raises an error if the given api resource type does not conform to the apiResourceTypeSchema.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} apiResourceType An api resource type.
 */
function validateApiResourceTypeWithSchema (ajv, apiResourceType) {
  const validator = ajv.compile(apiResourceTypeSchema)

  if (!validator(apiResourceType)) {
    throw new JsonotronApiResourceTypeValidationError(apiResourceType.urlRoot,
      `Unable to validate against apiResourceTypeSchema.\n${JSON.stringify(validator.errors, null, 2)}`)
  }
}

/**
 * Patches any missing/optional fields.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} apiResourceType An api resource type object to check for validity.
 */
function patchRoleType (apiResourceType) {
  const missingDocumentationProperties = []

  if (typeof apiResourceType.pluralTitle === 'undefined') {
    apiResourceType.pluralTitle = apiResourceType.title + 's'
    missingDocumentationProperties.push('pluralTitle')
  }

  // if (typeof roleType.paragraphs === 'undefined') {
  //   roleType.paragraphs = []
  //   missingDocumentationProperties.push('paragraphs')
  // }

  // if (typeof roleType.docPermissions === 'undefined') {
  //   roleType.docPermissions = {}
  // }

  // if (typeof roleType.docPermissions === 'object') {
  //   for (const docTypeName in roleType.docPermissions) {
  //     const spec = roleType.docPermissions[docTypeName]

  //     // query spec
  //     if (typeof spec.query === 'undefined') {
  //       spec.query = false
  //     } else if (typeof spec.query === 'object') {
  //       if (typeof spec.query.fieldsTreatment === 'undefined') {
  //         spec.query.fieldsTreatment = 'whitelist'
  //       }

  //       if (typeof spec.query.fields === 'undefined') {
  //         spec.query.fields = []
  //       }
  //     }

  //     // update spec
  //     if (typeof spec.update === 'undefined') {
  //       spec.update = false
  //     } else if (typeof spec.update === 'object') {
  //       if (typeof spec.update.patch === 'undefined') {
  //         spec.update.patch = false
  //       }

  //       if (typeof spec.update.operations === 'undefined') {
  //         spec.update.operations = []
  //       }
  //     }

  //     // create spec
  //     if (typeof spec.create === 'undefined') {
  //       spec.create = false
  //     }

  //     // delete spec
  //     if (typeof spec.delete === 'undefined') {
  //       spec.delete = false
  //     }

  //     // replace spec
  //     if (typeof spec.replace === 'undefined') {
  //       spec.replace = false
  //     }
  //   }
  // }

  return missingDocumentationProperties
}

/**
 * Raises an error if the given api resource type is not valid, otherwise it
 * patches in any missing/optional fields.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} apiResourceType An API resource type.
 * @param {Boolean} includeDocumentation True if missing documentation should
 * cause the validation to fail.
 */
function ensureApiResourceType (ajv, apiResourceType, includeDocumentation) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.object(apiResourceType)

  validateApiResourceTypeWithSchema(ajv, apiResourceType)
  const missingDocumentationProperties = patchRoleType(apiResourceType)

  if (includeDocumentation && missingDocumentationProperties.length > 0) {
    throw new JsonotronApiResourceTypeDocumentationMissingError(apiResourceType.urlRoot, missingDocumentationProperties)
  }
}

module.exports = ensureApiResourceType
