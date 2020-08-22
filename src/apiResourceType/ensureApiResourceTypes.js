const check = require('check-types')
const { JsonotronApiResourceTypesDocumentationMissingError, JsonotronApiResourceTypeValidationError } = require('jsonotron-errors')
const { ensureFieldTypes } = require('../fieldType')
const { apiResourceTypeSchema } = require('../schemas')
const { createJsonSchemaForFieldBlock, createJsonSchemaForParameterStringBlock } = require('../blocks')

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
    if (typeof field.isGuaranteed === 'undefined') { field.isGuaranteed = false }
    if (typeof field.isDeprecated === 'undefined') { field.isDeprecated = false }

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

      if (typeof parameter.isRequired === 'undefined') { parameter.isRequired = false }
      if (typeof parameter.isDeprecated === 'undefined') { parameter.isDeprecated = false }

      if (typeof parameter.paragraphs === 'undefined') {
        parameter.paragraphs = []
        missingDocumentationProperties.push(`endPoints[${index}].requestParameters['${parameterName}'].paragraphs`)
      }
    }

    if (typeof endPoint.requestPayload === 'undefined') {
      endPoint.requestPayload = {}
    }

    if (typeof endPoint.requestPayload.mechanism === 'undefined') { endPoint.requestPayload.mechanism = 'none' }
    if (typeof endPoint.requestPayload.httpQueryParamName === 'undefined') { endPoint.requestPayload.httpQueryParamName = '' }

    if (typeof endPoint.requestPayload.fields === 'undefined') {
      endPoint.requestPayload.fields = {}
    }

    for (const fieldName in endPoint.requestPayload.fields) {
      const field = endPoint.requestPayload.fields[fieldName]

      if (typeof field.isArray === 'undefined') { field.isArray = false }
      if (typeof field.isRequired === 'undefined') { field.isRequired = false }
      if (typeof field.isDeprecated === 'undefined') { field.isDeprecated = false }

      if (typeof field.paragraphs === 'undefined') {
        field.paragraphs = []
        missingDocumentationProperties.push(`endPoints[${index}].requestPayload.fields['${fieldName}'].paragraphs`)
      }
    }

    if (typeof endPoint.responseParameters === 'undefined') {
      endPoint.responseParameters = {}
    }

    for (const parameterName in endPoint.responseParameters) {
      const parameter = endPoint.responseParameters[parameterName]

      if (typeof parameter.isGuaranteed === 'undefined') { parameter.isGuaranteed = false }
      if (typeof parameter.isDeprecated === 'undefined') { parameter.isDeprecated = false }

      if (typeof parameter.paragraphs === 'undefined') {
        parameter.paragraphs = []
        missingDocumentationProperties.push(`endPoints[${index}].responseParameters['${parameterName}'].paragraphs`)
      }
    }

    if (typeof endPoint.responsePayload === 'undefined') {
      endPoint.responsePayload = {}
    }

    if (typeof endPoint.responsePayload.fields === 'undefined') {
      endPoint.responsePayload.fields = {}
    }

    for (const fieldName in endPoint.responsePayload.fields) {
      const field = endPoint.responsePayload.fields[fieldName]

      if (typeof field.isArray === 'undefined') { field.isArray = false }
      if (typeof field.isGuaranteed === 'undefined') { field.isGuaranteed = false }
      if (typeof field.isDeprecated === 'undefined') { field.isDeprecated = false }

      if (typeof field.paragraphs === 'undefined') {
        field.paragraphs = []
        missingDocumentationProperties.push(`endPoints[${index}].responsePayload.fields['${fieldName}'].paragraphs`)
      }
    }

    if (typeof endPoint.examples === 'undefined') {
      endPoint.examples = []
    }

    endPoint.examples.forEach((example, eIndex) => {
      if (typeof example.requestParameters === 'undefined') {
        example.requestParameters = {}
      }

      if (typeof example.responseParameters === 'undefined') {
        example.responseParameters = {}
      }

      if (typeof example.paragraphs === 'undefined') {
        example.paragraphs = []
        missingDocumentationProperties.push(`endPoints[${index}].examples[${eIndex}].paragraphs`)
      }
    })

    if (typeof endPoint.responseCodes === 'undefined') {
      endPoint.responseCodes = []
    }

    endPoint.responseCodes.forEach((responseCode, rIndex) => {
      if (typeof responseCode.paragraphs === 'undefined') {
        responseCode.paragraphs = []
        missingDocumentationProperties.push(`endPoints[${index}].responseCodes[${rIndex}].paragraphs`)
      }
    })

    if (typeof endPoint.isDeprecated === 'undefined') { endPoint.isDeprecated = false }
  })

  return missingDocumentationProperties
}

/**
 * Raises an error if any examples do not conform to the schema.
 * @param {Object} ajv A json validator.
 * @param {Object} apiResourceType A api resource type.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 */
function ensureResourceExamplesAreValid (ajv, apiResourceType, fieldTypes, enumTypes) {
  const schema = createJsonSchemaForFieldBlock(
    `API Resource Type "${apiResourceType.urlRoot}"`,
    apiResourceType.fields, fieldTypes, enumTypes)

  const validator = ajv.compile(schema)

  apiResourceType.examples.forEach((example, index) => {
    if (!validator(example.value)) {
      throw new JsonotronApiResourceTypeValidationError(apiResourceType.urlRoot,
        `Example at index ${index} does not match the schema.\n${JSON.stringify(validator.errors, null, 2)}`)
    }
  })
}

/**
 * Raises an error if any request body examples do not conform to the schema.
 * @param {Object} ajv A json validator.
 * @param {Object} apiResourceType A api resource type.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 */
function ensureEndPointExamplesRequestDataIsValid (ajv, apiResourceType, fieldTypes, enumTypes) {
  apiResourceType.endPoints.forEach((endPoint, index) => {
    const requestParametersSchema = createJsonSchemaForParameterStringBlock(
      `API Resource Type "${apiResourceType.urlRoot}" Request Parameters "${apiResourceType.urlRoot}${endPoint.url}"`,
      endPoint.requestParameters)

    const requestParametersValidator = ajv.compile(requestParametersSchema)

    const requestPayloadSchema = createJsonSchemaForFieldBlock(
      `API Resource Type "${apiResourceType.urlRoot}" Request Payload "${apiResourceType.urlRoot}${endPoint.url}"`,
      endPoint.requestPayload.fields, fieldTypes, enumTypes)

    const requestPayloadValidator = ajv.compile(requestPayloadSchema)

    endPoint.examples.forEach((example, eIndex) => {
      // check request parameters are defined
      if (!requestParametersValidator(example.requestParameters)) {
        throw new JsonotronApiResourceTypeValidationError(apiResourceType.urlRoot,
          `Example at index ${eIndex} of end point '${apiResourceType.urlRoot}${endPoint.url}' ` +
          `does not match the request parameters schema.\n${JSON.stringify(requestParametersValidator.errors, null, 2)}`)
      }

      // check request payload matches request fields definitions
      if (!requestPayloadValidator(example.requestPayload)) {
        throw new JsonotronApiResourceTypeValidationError(apiResourceType.urlRoot,
          `Example at index ${eIndex} of end point '${apiResourceType.urlRoot}${endPoint.url}' ` +
          `does not match the request payload schema.\n${JSON.stringify(requestPayloadValidator.errors, null, 2)}`)
      }
    })
  })
}

/**
 * Raises an error if any response body examples do not conform to the schema.
 * @param {Object} ajv A json validator.
 * @param {Object} apiResourceType A api resource type.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 */
function ensureEndPointExamplesResponseDataIsValid (ajv, apiResourceType, fieldTypes, enumTypes) {
  apiResourceType.endPoints.forEach((endPoint, index) => {
    const responseParametersSchema = createJsonSchemaForParameterStringBlock(
      `API Resource Type "${apiResourceType.urlRoot}" Response Parameters "${apiResourceType.urlRoot}${endPoint.url}"`,
      endPoint.responseParameters)

    const responseParametersValidator = ajv.compile(responseParametersSchema)

    const responsePayloadSchema = createJsonSchemaForFieldBlock(
      `API Resource Type "${apiResourceType.urlRoot}" Response Body "${apiResourceType.urlRoot}${endPoint.url}"`,
      endPoint.responsePayload.fields, fieldTypes, enumTypes)

    const responsePayloadValidator = ajv.compile(responsePayloadSchema)

    endPoint.examples.forEach((example, eIndex) => {
      // check response parameters are defined
      if (!responseParametersValidator(example.responseParameters)) {
        throw new JsonotronApiResourceTypeValidationError(apiResourceType.urlRoot,
          `Example at index ${eIndex} of end point '${apiResourceType.urlRoot}${endPoint.url}' ` +
          `does not match the response parameters schema.\n${JSON.stringify(responseParametersValidator.errors, null, 2)}`)
      }

      // check request payload matches request fields definitions
      if (!responsePayloadValidator(example.responsePayload)) {
        throw new JsonotronApiResourceTypeValidationError(apiResourceType.urlRoot,
          `Example at index ${eIndex} of end point '${apiResourceType.urlRoot}${endPoint.url}' ` +
          `does not match the response payload schema.\n${JSON.stringify(responsePayloadValidator.errors, null, 2)}`)
      }
    })
  })
}

/**
 * Raises an error if the given api resource type is not valid, otherwise it
 * patches in any missing/optional fields.
 * @param {Object} ajv A JSON schema validator.
 * @param {Object} apiResourceType An API resource type.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 * @param {Boolean} includeDocumentation True if missing documentation should
 * cause the validation to fail.
 */
function ensureApiResourceTypes (ajv, apiResourceTypes, fieldTypes, enumTypes, includeDocumentation) {
  check.assert.object(ajv)
  check.assert.function(ajv.validate)
  check.assert.array.of.object(apiResourceTypes)
  check.assert.array.of.object(fieldTypes)
  check.assert.array.of.object(enumTypes)

  const missingDocumentationBlocks = []

  // check field types are valid (which implicitly checks the enumTypes too)
  ensureFieldTypes(ajv, fieldTypes, enumTypes, includeDocumentation)

  apiResourceTypes.forEach(apiResourceType => {
    // check schema
    validateApiResourceTypeWithSchema(ajv, apiResourceType)

    // fill in the missing/optional parts
    const missingDocumentationProperties = patchApiResourceType(apiResourceType)

    if (missingDocumentationProperties.length > 0) {
      missingDocumentationBlocks.push({ apiResourceTypeUrlRoot: apiResourceType.urlRoot, propertyPaths: missingDocumentationProperties })
    }

    // check examples match the resource fields
    ensureResourceExamplesAreValid(ajv, apiResourceType, fieldTypes, enumTypes)

    // check the request body examples match the request payload fields
    ensureEndPointExamplesRequestDataIsValid(ajv, apiResourceType, fieldTypes, enumTypes)

    // check the response body examples match the response payload fields
    ensureEndPointExamplesResponseDataIsValid(ajv, apiResourceType, fieldTypes, enumTypes)

    // THEN WRITE METHOD createApiResourceTypeFromDocType
  })

  if (includeDocumentation && missingDocumentationBlocks.length > 0) {
    throw new JsonotronApiResourceTypesDocumentationMissingError(missingDocumentationBlocks)
  }
}

module.exports = ensureApiResourceTypes
