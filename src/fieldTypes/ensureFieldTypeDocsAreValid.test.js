/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const { JsonotronFieldTypeDocsValidationError } = require('jsonotron-errors')
const ensureFieldTypeDocsAreValid = require('./ensureFieldTypeDocsAreValid')

const fieldTypes = [{
  name: 'candidateFieldType',
  jsonSchema: {
    type: 'string'
  }
}]

const createValidFieldTypeDocs = () => ({
  name: 'candidateFieldType',
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
  expect(ensureFieldTypeDocsAreValid(ajv, [createValidFieldTypeDocs()], fieldTypes)).toBeUndefined()
})

test('Field type docs with missing title fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldTypeDocs()
  delete candidate.title
  expect(() => ensureFieldTypeDocsAreValid(ajv, [candidate], fieldTypes)).toThrow(JsonotronFieldTypeDocsValidationError)
  expect(() => ensureFieldTypeDocsAreValid(ajv, [candidate], fieldTypes)).toThrow(/required property 'title'/)
})

test('Field type docs with invalid lang fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldTypeDocs()
  candidate.lang = 'XX'
  expect(() => ensureFieldTypeDocsAreValid(ajv, [candidate], fieldTypes)).toThrow(JsonotronFieldTypeDocsValidationError)
  expect(() => ensureFieldTypeDocsAreValid(ajv, [candidate], fieldTypes)).toThrow(/properties\/lang\/pattern/)
})

test('Field type docs based on missing underlying type fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldTypeDocs()
  expect(() => ensureFieldTypeDocsAreValid(ajv, [candidate], [])).toThrow(JsonotronFieldTypeDocsValidationError)
  expect(() => ensureFieldTypeDocsAreValid(ajv, [candidate], [])).toThrow(/Docs supplied for unknown field type/)
})

test('Field type docs based on missing underlying type fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldTypeDocs()
  candidate.examples[0].value = 123
  expect(() => ensureFieldTypeDocsAreValid(ajv, [candidate], fieldTypes)).toThrow(JsonotronFieldTypeDocsValidationError)
  expect(() => ensureFieldTypeDocsAreValid(ajv, [candidate], fieldTypes)).toThrow(/Example value '123' does not validate with the schema/)
})
