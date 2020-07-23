/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const { JsonotronCategoryDocsValidationError } = require('jsonotron-errors')
const ensureCategoryDocsAreValid = require('./ensureCategoryDocsAreValid')

const createValidCategoryDocs = () => ({
  name: 'candidateCategoryDocs',
  lang: 'en',
  title: 'Candidate'
})

test('Valid category docs can be verified.', () => {
  const ajv = createCustomisedAjv()
  expect(ensureCategoryDocsAreValid(ajv, [createValidCategoryDocs()])).toBeUndefined()
})

test('Category docs with missing title fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidCategoryDocs()
  delete candidate.title
  expect(() => ensureCategoryDocsAreValid(ajv, [candidate])).toThrow(JsonotronCategoryDocsValidationError)
})
