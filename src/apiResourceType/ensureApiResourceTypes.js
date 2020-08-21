const check = require('check-types')
const { JsonotronApiResourceTypesDocumentationMissingError, JsonotronApiResourceTypeValidationError } = require('jsonotron-errors')
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
function patchApiResourceType (apiResourceType) {
  const missingDocumentationProperties = []

  /* root */

  if (typeof apiResourceType.pluralTitle === 'undefined') {
    apiResourceType.pluralTitle = apiResourceType.title + 's'
    missingDocumentationProperties.push('pluralTitle')
  }

  if (typeof apiResourceType.summary === 'undefined') {
    apiResourceType.summary = ''
    missingDocumentationProperties.push('paragraphs')
  }

  if (typeof apiResourceType.paragraphs === 'undefined') {
    apiResourceType.paragraphs = []
    missingDocumentationProperties.push('paragraphs')
  }

  /* fields */

  if (typeof apiResourceType.fields === 'undefined') {
    apiResourceType.fields = {}
  }

  for (const fieldName in apiResourceType.fields) {
    const field = apiResourceType.fields[fieldName]

    if (typeof field.isArray === 'undefined') { apiResourceType.isArray = false }
    if (typeof field.tags === 'undefined') { apiResourceType.tags = [] }

    if (typeof field.paragraphs === 'undefined') {
      field.paragraphs = []
      missingDocumentationProperties.push(`fields['${fieldName}'].paragraphs`)
    }
  }

  /* examples */

  if (typeof apiResourceType.examples === 'undefined') {
    apiResourceType.examples = []
  }

  apiResourceType.examples.forEach((example, index) => {
    if (typeof example.paragraphs === 'undefined') {
      example.paragraphs = []
      missingDocumentationProperties.push(`example[${index}].paragraphs`)
    }
  })

  /* end-points */

  if (typeof apiResourceType.endPoints === 'undefined') {
    apiResourceType.endPoints = []
  }

  apiResourceType.endPoints.forEach((endPoint, index) => {
    if (typeof endPoint.paragraphs === 'undefined') {
      endPoint.paragraphs = []
      missingDocumentationProperties.push(`endPoints[${index}].paragraphs`)
    }

    if (typeof endPoint.requestParameters === 'undefined') {
      endPoint.requestParameters = {}
    }

    for (const parameterName in endPoint.requestParameters) {
      const parameter = endPoint.requestParameters[parameterName]

      if (typeof parameter.tags === 'undefined') { parameter.tags = [] }

      if (typeof parameter.paragraphs === 'undefined') {
        parameter.paragraphs = []
        missingDocumentationProperties.push(`endPoints[${index}].requestParameters['${parameterName}'].paragraphs`)
      }
    }

    if (typeof endPoint.requestPayload === 'undefined') {
      endPoint.requestPayload = {}
    }

    if (typeof endPoint.requestPayload.location === 'undefined') { endPoint.requestPayload.location = 'httpBody' }
    if (typeof endPoint.requestPayload.httpQueryParamName === 'undefined') { endPoint.requestPayload.httpQueryParamName = '' }

    if (typeof endPoint.requestPayload.fields === 'undefined') {
      endPoint.requestPayload.fields = {}
    }

    for (const fieldName in endPoint.requestPayload.fields) {
      const field = endPoint.requestPayload.fields[fieldName]

      if (typeof field.isArray === 'undefined') { apiResourceType.isArray = false }
      if (typeof field.tags === 'undefined') { apiResourceType.tags = [] }

      if (typeof field.paragraphs === 'undefined') {
        field.paragraphs = []
        missingDocumentationProperties.push(`endPoints[${index}].requestPayload.fields['${fieldName}'].paragraphs`)
      }
    }

    if (typeof endPoint.examples === 'undefined') {
      endPoint.examples = []
    }

    endPoint.examples.forEach((example, eIndex) => {
      if (typeof example.paragraphs === 'undefined') {
        example.paragraphs = []
        missingDocumentationProperties.push(`endPoints[${index}].examples[${eIndex}].paragraphs`)
      }
    })

    if (typeof endPoint.tags === 'undefined') { endPoint.tags = [] }

    if (typeof endPoint.responseCodes === 'undefined') {
      endPoint.responseCodes = []
    }

    endPoint.responseCodes.forEach((responseCode, rIndex) => {
      if (typeof responseCode.paragraphs === 'undefined') {
        responseCode.paragraphs = []
        missingDocumentationProperties.push(`endPoints[${index}].responseCodes[${rIndex}].paragraphs`)
      }
    })
  })

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
function ensureApiResourceTypes (ajv, apiResourceTypes, includeDocumentation) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.array.of.object(apiResourceTypes)

  const missingDocumentationBlocks = []

  apiResourceTypes.forEach(apiResourceType => {
    validateApiResourceTypeWithSchema(ajv, apiResourceType)

    const missingDocumentationProperties = patchApiResourceType(apiResourceType)

    if (missingDocumentationProperties.length > 0) {
      missingDocumentationBlocks.push({ apiResourceTypeUrlRoot: apiResourceType.urlRoot, propertyPaths: missingDocumentationProperties })
    }

    // ensure field types are valid

    // ensure examples are valid (based on the fields)

    // ensure the end-point request-payload field types are valid

    // ensure the end-point response-payload field types are valid

    // ensure examples are valid (based on requestBody and responseBody fields)

    // THEN WRITE METHOD createApiResourceTypeFromDocType
  })

  if (includeDocumentation && missingDocumentationBlocks.length > 0) {
    throw new JsonotronApiResourceTypesDocumentationMissingError(missingDocumentationBlocks)
  }
}

module.exports = ensureApiResourceTypes
