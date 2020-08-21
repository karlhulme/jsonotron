/* eslint-env jest */
const { JsonotronApiResourceTypesDocumentationMissingError, JsonotronApiResourceTypeValidationError } = require('jsonotron-errors')
const { createCustomisedAjv } = require('../validator')
const ensureApiResourceTypes = require('./ensureApiResourceTypes')

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
      a: { type: 'string', tags: ['required'] },
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
        id: { parameterType: 'urlPathParam', tags: ['required'] },
        maxCount: { parameterType: 'urlQueryParam', paragraphs: ['Describe this maxCount parameter.'] }
      },
      requestPayload: {
        location: 'httpQueryParam',
        httpQueryParamName: 'filterParams',
        fields: {
          d: { type: 'string', tags: ['required'] },
          e: { type: 'integer', isArray: false },
          f: { type: 'boolean', paragraphs: ['Describe this field.'] }
        }
      },
      responseParameters: {
        'X-PROC-TIME': { parameterType: 'httpHeader', paragraphs: ['The processing time.'] }
      },
      responsePayload: {
        fields: {
          g: { type: 'string', tags: ['guaranteed'] },
          h: { type: 'integer', isArray: false },
          i: { type: 'boolean', paragraphs: ['Describe this field.'] }
        }
      },
      examples: [{
        requestCommand: ['curl -H Bearer some_token -d the_payload.json'],
        requestBody: { d: 'd', e: 2, f: false },
        responseCode: 200,
        responseBody: { g: '1234' }
      }, {
        requestCommand: ['curl -H Bearer some_token -d the_new_payload.json'],
        requestBody: { d: 'd', e: 8, f: false },
        responseCode: 200,
        responseBody: { g: '4321', h: 4321 },
        paragraphs: ['Describe this example.']
      }],
      tags: [],
      responseCodes: [{
        httpCode: 200
      }, {
        httpCode: 400,
        paragraphs: ['Data input was invalid.']
      }]
    }, {
      title: 'Post data',
      httpVerb: 'post'
    }]
  }
}

test('A minimal api resource type will validate.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createMinimalApiResourceType()
  expect(() => ensureApiResourceTypes(ajv, [candidate])).not.toThrow()
  expect(candidate.pluralTitle).toEqual('Resources')
})

test('A minimal api resource type will yield documentation errors.', () => {
  const ajv = createCustomisedAjv()
  const candidate1 = createMinimalApiResourceType()
  expect(() => ensureApiResourceTypes(ajv, [candidate1], true)).toThrow(JsonotronApiResourceTypesDocumentationMissingError)
  const candidate2 = createMinimalApiResourceType()
  expect(() => ensureApiResourceTypes(ajv, [candidate2], true)).toThrow(/pluralTitle/)
})

test('A fully documented api resource type will validate including documentation checks.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createMinimalApiResourceType()
  candidate.pluralTitle = 'Resources'
  candidate.summary = 'A summary'
  candidate.paragraphs = ['Paragraphs.']
  expect(() => ensureApiResourceTypes(ajv, [candidate], true)).not.toThrow()
})

test('A valid api resource type will validate and will be patched.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidApiResourceType()
  expect(() => ensureApiResourceTypes(ajv, [candidate])).not.toThrow()
  expect(candidate.pluralTitle).toEqual('The Resources')

  expect(candidate.endPoints[1].paragraphs).toEqual([])
  expect(candidate.endPoints[1].requestParameters).toEqual({})
  expect(candidate.endPoints[1].requestPayload).toBeDefined()
  expect(candidate.endPoints[1].requestPayload.location).toEqual('httpBody')
  expect(candidate.endPoints[1].requestPayload.httpQueryParamName).toEqual('')
  expect(candidate.endPoints[1].requestPayload.fields).toEqual({})
  expect(candidate.endPoints[1].examples).toEqual([])
  expect(candidate.endPoints[1].tags).toEqual([])
  expect(candidate.endPoints[1].responseCodes).toEqual([])
})

test('An invalid api resource type will not validate.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidApiResourceType()
  candidate.pluralTitle = 15
  expect(() => ensureApiResourceTypes(ajv, [candidate])).toThrow(JsonotronApiResourceTypeValidationError)
})
