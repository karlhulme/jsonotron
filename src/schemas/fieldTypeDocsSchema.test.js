/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const fieldTypeDocsSchema = require('./fieldTypeDocsSchema')

test('Accept valid field type docs schema.', () => {
  const ajv = createCustomisedAjv()

  const validFieldTypeDocs = {
    name: 'candidateField',
    lang: 'en',
    title: 'Candidate Field',
    paragraphs: ['line one', 'line two'],
    examples: [
      { value: 12 },
      { value: 'foo', paragraphs: [] },
      {
        value: { deep: { nested: 'object' }, bar: 123 },
        paragraphs: ['line a', 'line b']
      }
    ]
  }

  expect(ajv.validate(fieldTypeDocsSchema, validFieldTypeDocs)).toEqual(true)
})

test('Reject invalid field type docs schema that is missing a title.', () => {
  const ajv = createCustomisedAjv()

  const invalidFieldTypeDocs = {
    name: 'candidateField',
    lang: 'en',
    paragraphs: ['line one', 'line two'],
    examples: [
      { value: 12 },
      { value: 'foo', paragraphs: [] },
      {
        value: { deep: { nested: 'object' }, bar: 123 },
        paragraphs: ['line a', 'line b']
      }
    ]
  }

  expect(ajv.validate(fieldTypeDocsSchema, invalidFieldTypeDocs)).toEqual(false)
})

test('Reject invalid field type docs schema that has no paragraphs.', () => {
  const ajv = createCustomisedAjv()

  const invalidFieldTypeDocs = {
    name: 'candidateField',
    lang: 'en',
    title: 'Candidate Field',
    paragraphs: [],
    examples: [
      { value: 12 },
      { value: 'foo', paragraphs: [] },
      {
        value: { deep: { nested: 'object' }, bar: 123 },
        paragraphs: ['line a', 'line b']
      }
    ]
  }

  expect(ajv.validate(fieldTypeDocsSchema, invalidFieldTypeDocs)).toEqual(false)
})

test('Reject invalid field type docs schema that has no examples.', () => {
  const ajv = createCustomisedAjv()

  const invalidFieldTypeDocs = {
    name: 'candidateField',
    lang: 'en',
    title: 'Candidate Field',
    paragraphs: ['line one', 'line two'],
    examples: []
  }

  expect(ajv.validate(fieldTypeDocsSchema, invalidFieldTypeDocs)).toEqual(false)
})

test('Reject invalid field type docs schema that contains an unexpected property.', () => {
  const ajv = createCustomisedAjv()

  const invalidFieldTypeDocs = {
    name: 'candidateField',
    lang: 'en',
    title: 'Candidate Field',
    unexpected: 'property',
    paragraphs: ['line one', 'line two'],
    examples: [
      { value: 12 },
      { value: 'foo', paragraphs: [] },
      {
        value: { deep: { nested: 'object' }, bar: 123 },
        paragraphs: ['line a', 'line b']
      }
    ]
  }

  expect(ajv.validate(fieldTypeDocsSchema, invalidFieldTypeDocs)).toEqual(false)
})
