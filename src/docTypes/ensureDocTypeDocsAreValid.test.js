/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const { JsonotronDocTypeDocsValidationError } = require('jsonotron-errors')
const ensureDocTypeDocsAreValid = require('./ensureDocTypeDocsAreValid')

const fieldTypes = [{
  name: 'string',
  jsonSchema: { type: 'string' }
}, {
  name: 'sysDateTime',
  jsonSchema: { type: 'string' }
}, {
  name: 'sysDateTime',
  jsonSchema: { type: 'string' }
}, {
  name: 'sysId',
  jsonSchema: { type: 'string' }
}, {
  name: 'sysUserIdentity',
  jsonSchema: { type: 'string' }
}, {
  name: 'sysVersion',
  jsonSchema: { type: 'string' }
}, {
  name: 'sysOpId',
  jsonSchema: { type: 'string' }
}]

const docTypes = [{
  name: 'simpleDocType',
  fields: {
    fieldA: { type: 'string' },
    fieldB: { type: 'string' }
  }
}, {
  name: 'candidateDocType',
  fields: {
    fieldA: { type: 'string' },
    fieldB: { type: 'string' }
  },
  filters: {
    byFieldB: {
      parameters: {
        fieldB: { type: 'string' }
      }
    }
  }
}]

const createSimpleDocTypeDocs = () => ({
  name: 'simpleDocType',
  lang: 'en',
  title: 'Simple',
  pluralTitle: 'Simples',
  paragraphs: ['line one', 'line two'],
  fields: {
    fieldA: { paragraphs: ['line 1'] },
    fieldB: { paragraphs: ['line 2'] }
  }
})

const createValidDocTypeDocs = () => ({
  name: 'candidateDocType',
  lang: 'en',
  title: 'Candidate',
  pluralTitle: 'Candidates',
  paragraphs: ['line one', 'line two'],
  fields: {
    fieldA: { paragraphs: ['line 1'] },
    fieldB: { paragraphs: ['line 2'] }
  },
  examples: [{
    value: {
      id: 'example_id',
      docType: 'candidateDocType',
      fieldA: 'first',
      fieldB: 'second'
    }
  }],
  filters: {
    byFieldB: {
      parameters: {
        fieldB: { paragraphs: ['my notes on field B.'] }
      },
      examples: [{
        value: {
          fieldB: 'my-search-value'
        }
      }]
    }
  }
})

test('Valid doc type docs can be verified.', () => {
  const ajv = createCustomisedAjv()
  expect(() => ensureDocTypeDocsAreValid(ajv, [createValidDocTypeDocs(), createSimpleDocTypeDocs()], docTypes, fieldTypes)).not.toThrow()
})

test('Doc type docs with missing title fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  delete candidate.title
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/required property 'title'/)
})

test('Doc type docs with invalid lang fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  candidate.lang = 'XX'
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/properties\/lang\/pattern/)
})

test('Doc type docs based on missing underlying doc type fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  candidate.name = 'unknownDocType'
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/unknown doc type/)
})

test('Doc type docs with zero examples passes verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  delete candidate.examples
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).not.toThrow()
})

test('Doc type docs with invalid example fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  candidate.examples[0].value.fieldA = 101
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/fieldA/)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/should be string/)
})

test('Doc type docs with missing filter for underlying doc type filter fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  delete candidate.filters.byFieldB
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/Filter 'byFieldB' is not defined/)
})

test('Doc type docs with missing filters section when underlying doc type declares a filter fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  delete candidate.filters
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/'filters' property is not defined/)
})

test('Doc type docs with missing filter parameter fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  delete candidate.filters.byFieldB.parameters.fieldB
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/'fieldB' that is not defined/)
})

test('Doc type docs with surplus filter parameter fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  candidate.filters.byFieldB.parameters.fieldC = { paragraphs: ['this is an extra parameter.'] }
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/'fieldC' but it is defined in the docs/)
})

test('Doc type docs with invalid filter example fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidDocTypeDocs()
  candidate.filters.byFieldB.examples.push({ value: { fieldB: 123 }, paragraphs: ['this will not work'] })
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(JsonotronDocTypeDocsValidationError)
  expect(() => ensureDocTypeDocsAreValid(ajv, [candidate], docTypes, fieldTypes)).toThrow(/Unable to validate filter example at index 1/)
})
