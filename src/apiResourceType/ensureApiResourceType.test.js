/* eslint-env jest */
const { JsonotronApiResourceTypeDocumentationMissingError, JsonotronApiResourceTypeValidationError } = require('jsonotron-errors')
const { createCustomisedAjv } = require('../validator')
const ensureApiResourceType = require('./ensureApiResourceType')

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
    fields: {},
    examples: [],
    endPoints: []
  }
}

test('A minimal api resource type will validate.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createMinimalApiResourceType()
  expect(() => ensureApiResourceType(ajv, candidate)).not.toThrow()
  expect(candidate.pluralTitle).toEqual('Resources')
})

test('A minimal api resource type will yield documentation errors.', () => {
  const ajv = createCustomisedAjv()
  const candidate1 = createMinimalApiResourceType()
  expect(() => ensureApiResourceType(ajv, candidate1, true)).toThrow(JsonotronApiResourceTypeDocumentationMissingError)
  const candidate2 = createMinimalApiResourceType()
  expect(() => ensureApiResourceType(ajv, candidate2, true)).toThrow(/pluralTitle/)
})

test('A valid api resource type will validate.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidApiResourceType()
  expect(() => ensureApiResourceType(ajv, candidate)).not.toThrow()
  expect(candidate.pluralTitle).toEqual('The Resources')
})

test('An invalid api resource type will validate.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidApiResourceType()
  candidate.pluralTitle = 15
  expect(() => ensureApiResourceType(ajv, candidate)).toThrow(JsonotronApiResourceTypeValidationError)
})
