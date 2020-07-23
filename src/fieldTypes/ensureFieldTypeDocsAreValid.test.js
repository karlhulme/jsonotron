/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const { JsonotronFieldTypeDocsValidationError } = require('jsonotron-errors')
const ensureFieldTypeDocsAreValid = require('./ensureFieldTypeDocsAreValid')

const createValidFieldTypeDocs = () => ({
  name: 'candidateFieldTypeDocs',
  lang: 'en',
  title: 'Candidate',
  paragraphs: ['line one', 'line two'],
  examples: [
    { value: 'example 1', paragraphs: ['line a', 'line b'] },
    { value: 'example 2' }
  ]
})

test('Valid field type docs can be verified.', () => {
  const ajv = createCustomisedAjv()
  expect(ensureFieldTypeDocsAreValid(ajv, [createValidFieldTypeDocs()])).toBeUndefined()
})

test('Field type docs with missing title fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldTypeDocs()
  delete candidate.title
  expect(() => ensureFieldTypeDocsAreValid(ajv, [candidate])).toThrow(JsonotronFieldTypeDocsValidationError)
})

test('Field type docs with invalid lang fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldTypeDocs()
  candidate.lang = 'EN'
  expect(() => ensureFieldTypeDocsAreValid(ajv, [candidate])).toThrow(JsonotronFieldTypeDocsValidationError)
})
