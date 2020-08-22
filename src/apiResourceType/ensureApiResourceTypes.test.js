/* eslint-env jest */
const { JsonotronApiResourceTypesDocumentationMissingError, JsonotronApiResourceTypeValidationError } = require('jsonotron-errors')
const { createCustomisedAjv } = require('../validator')
const ensureApiResourceTypes = require('./ensureApiResourceTypes')

const testEnumTypes = [
  {
    name: 'boolean',
    items: [
      { value: true },
      { value: false }
    ]
  }
]

const testFieldTypes = [
  {
    name: 'integer',
    jsonSchema: {
      type: 'integer'
    }
  }, {
    name: 'float',
    jsonSchema: {
      type: 'number'
    }
  }, {
    name: 'string',
    jsonSchema: {
      type: 'string'
    }
  }
]

function createMinimalApiResourceType () {
  return {
    urlRoot: '/resources',
    title: 'Resource'
  }
}

function createValidApiResourceType () {
  return {
    urlRoot: '/resources',
    title: 'Resource',
    pluralTitle: 'The Resources',
    summary: 'An example resource',
    paragraphs: ['Information about this example resource'],
    fields: {
      a: { type: 'string', isGuaranteed: true },
      b: { type: 'integer', isArray: false },
      c: { type: 'boolean', paragraphs: ['Describe this field.'] }
    },
    examples: [{
      value: { a: 'a', b: 1, c: true }
    }, {
      value: { a: 'a', b: 1, c: true },
      paragraphs: ['Describe this example.']
    }],
    endPoints: [{
      title: 'Get data',
      httpVerb: 'get',
      url: '/:id',
      paragraphs: ['Describe this end-point.'],
      requestParameters: {
        id: { mechanism: 'urlPathParam', isRequired: true },
        maxCount: { mechanism: 'urlQueryParam', paragraphs: ['Describe this maxCount parameter.'] }
      },
      requestPayload: {
        mechanism: 'httpQueryParam',
        httpQueryParamName: 'filterParams',
        fields: {
          d: { type: 'string', isRequired: true },
          e: { type: 'integer', isArray: false },
          f: { type: 'boolean', paragraphs: ['Describe this field.'] }
        }
      },
      responseParameters: {
        'X-PROC-TIME': { mechanism: 'httpHeader', isGuaranteed: true, paragraphs: ['The processing time.'] },
        'X-OTHER': { mechanism: 'httpHeader' }
      },
      responsePayload: {
        fields: {
          g: { type: 'string', isGuaranteed: true },
          h: { type: 'integer', isArray: false },
          i: { type: 'boolean', paragraphs: ['Describe this field.'] }
        }
      },
      examples: [{
        requestParameters: { id: '1234' },
        requestPayload: { d: 'd', e: 2, f: false },
        responseParameters: { 'X-PROC-TIME': '12ms' },
        responsePayload: { g: '1234' },
        paragraphs: ['Describe this example.']
      }, {
        requestParameters: { id: '1234' },
        requestPayload: { d: 'd', e: 8, f: false },
        responseParameters: { 'X-PROC-TIME': '12ms' },
        responsePayload: { g: '4321', h: 4321 }
      }],
      isDeprecated: false,
      responseCodes: [{
        httpCode: 200
      }, {
        httpCode: 400,
        paragraphs: ['Data input was invalid.']
      }]
    }, {
      title: 'Post data',
      httpVerb: 'post',
      examples: [{
        requestPayload: {},
        responsePayload: {}
      }]
    }, {
      title: 'Post more data',
      httpVerb: 'post'
    }]
  }
}

test('A minimal api resource type will validate.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createMinimalApiResourceType()
  expect(() => ensureApiResourceTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).not.toThrow()
  expect(candidate.pluralTitle).toEqual('Resources')
})

test('A minimal api resource type will yield documentation errors.', () => {
  const ajv = createCustomisedAjv()
  const candidate1 = createMinimalApiResourceType()
  expect(() => ensureApiResourceTypes(ajv, [candidate1], testFieldTypes, testEnumTypes, true)).toThrow(JsonotronApiResourceTypesDocumentationMissingError)
  const candidate2 = createMinimalApiResourceType()
  expect(() => ensureApiResourceTypes(ajv, [candidate2], testFieldTypes, testEnumTypes, true)).toThrow(/pluralTitle/)
})

test('A fully documented api resource type will validate including documentation checks.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createMinimalApiResourceType()
  candidate.pluralTitle = 'Resources'
  candidate.summary = 'A summary'
  candidate.paragraphs = ['Paragraphs.']
  expect(() => ensureApiResourceTypes(ajv, [candidate], testFieldTypes, testEnumTypes, true)).not.toThrow()
})

test('A valid api resource type will validate and will be patched.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidApiResourceType()
  expect(() => ensureApiResourceTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).not.toThrow()
  expect(candidate.pluralTitle).toEqual('The Resources')

  expect(candidate.endPoints[1].paragraphs).toEqual([])
  expect(candidate.endPoints[1].requestParameters).toEqual({})
  expect(candidate.endPoints[1].requestPayload).toBeDefined()
  expect(candidate.endPoints[1].requestPayload.mechanism).toEqual('none')
  expect(candidate.endPoints[1].requestPayload.httpQueryParamName).toEqual('')
  expect(candidate.endPoints[1].requestPayload.fields).toEqual({})
  expect(candidate.endPoints[1].examples).toEqual([{
    paragraphs: [],
    requestParameters: {},
    requestPayload: {},
    responseParameters: {},
    responsePayload: {}
  }])
  expect(candidate.endPoints[1].responseCodes).toEqual([])
  expect(candidate.endPoints[2].examples).toEqual([])
})

test('An invalid api resource type will not validate.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidApiResourceType()
  candidate.pluralTitle = 15
  expect(() => ensureApiResourceTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(JsonotronApiResourceTypeValidationError)
})

test('An invalid example resource will cause validation to fail.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidApiResourceType()
  candidate.examples[0].value.b = 'not-an-integer'
  expect(() => ensureApiResourceTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(JsonotronApiResourceTypeValidationError)
  expect(() => ensureApiResourceTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(/should be integer/)
})

test('A missing required request parameter in an example will cause validation to fail.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidApiResourceType()
  delete candidate.endPoints[0].examples[0].requestParameters.id
  expect(() => ensureApiResourceTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(JsonotronApiResourceTypeValidationError)
  expect(() => ensureApiResourceTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(/id/)
})

test('An invalid request body example will cause validation to fail.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidApiResourceType()
  delete candidate.endPoints[0].examples[0].requestPayload.d
  expect(() => ensureApiResourceTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(JsonotronApiResourceTypeValidationError)
  expect(() => ensureApiResourceTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(/should have required property 'd'/)
})

test('A missing required response parameter in an example will cause validation to fail.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidApiResourceType()
  delete candidate.endPoints[0].examples[0].responseParameters['X-PROC-TIME']
  expect(() => ensureApiResourceTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(JsonotronApiResourceTypeValidationError)
  expect(() => ensureApiResourceTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(/X-PROC-TIME/)
})

test('An invalid response body example will cause validation to fail.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidApiResourceType()
  delete candidate.endPoints[0].examples[0].responsePayload.g
  expect(() => ensureApiResourceTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(JsonotronApiResourceTypeValidationError)
  expect(() => ensureApiResourceTypes(ajv, [candidate], testFieldTypes, testEnumTypes)).toThrow(/should have required property 'g'/)
})
