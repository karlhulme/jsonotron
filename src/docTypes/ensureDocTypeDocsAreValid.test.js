/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const { JsonotronDocTypeDocsValidationError } = require('jsonotron-errors')
const ensureDocTypeDocsAreValid = require('./ensureDocTypeDocsAreValid')

const createValidDocTypeDocs = () => ({
  name: 'candidateDocTypeDocs',
  lang: 'en',
  title: 'Candidate',
  pluralTitle: 'Candidates',
  paragraphs: ['line one', 'line two'],
  fields: {
    fieldA: { paragraphs: ['line 1'] },
    fieldB: { paragraphs: ['line 2'] }
  }
})

test('Valid doc type docs can be verified.', () => {
  const ajv = createCustomisedAjv()
  expect(ensureDocTypeDocsAreValid(ajv, [createValidDocTypeDocs()])).toBeUndefined()
})

test('Doc type docs with missing title fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  delete candidate.title
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate])).toThrow(JsonotronDocTypeDocsValidationError)
})

test('Doc type docs with invalid lang fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  candidate.lang = 'EN'
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate])).toThrow(JsonotronDocTypeDocsValidationError)
})
