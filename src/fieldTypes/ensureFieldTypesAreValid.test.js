/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const { JsonotronFieldTypeValidationError } = require('jsonotron-errors')
const ensureFieldTypesAreValid = require('./ensureFieldTypesAreValid')

const createValidFieldType = () => ({
  name: 'candidateFieldType',
  title: 'Candidate Field Type',
  category: 'Candidate',
  description: 'A candidate field type.',
  docExamples: [1, 2, 3],
  validExamples: [4, 5, 6],
  invalidExamples: ['a string', '', null, true, {}, [], -34.56, -1, 0],
  jsonSchema: {
    type: 'number',
    exclusiveMinimum: 0
  }
})

const createValidEnumFieldType = () => ({
  name: 'candidateFieldType',
  title: 'Candidate Field Type',
  category: 'Candidate',
  description: 'A candidate field type.',
  values: [
    { value: 'A', description: 'The first letter of the alphabet.' },
    { value: 'B', description: 'The second letter of the alphabet.' }
  ]
})

test('Valid field type can be verified.', () => {
  const ajv = createCustomisedAjv()
  expect(ensureFieldTypesAreValid(ajv, [createValidFieldType()])).toBeUndefined()
})

test('Valid field type without additional validExamples can be verified.', () => {
  const ajv = createCustomisedAjv()
  const validFieldType = createValidFieldType()
  delete validFieldType.validExamples
  expect(ensureFieldTypesAreValid(ajv, [validFieldType])).toBeUndefined()
})

test('Valid enum field type can be verified.', () => {
  const ajv = createCustomisedAjv()
  expect(ensureFieldTypesAreValid(ajv, [createValidEnumFieldType()])).toBeUndefined()
})

test('Invalid field type with missing description fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldType()
  delete candidate.description
  expect(() => ensureFieldTypesAreValid(ajv, [candidate])).toThrow(JsonotronFieldTypeValidationError)
})

test('Regular field type with values array fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldType()
  candidate.values = []
  expect(() => ensureFieldTypesAreValid(ajv, [candidate])).toThrow(JsonotronFieldTypeValidationError)
})

test('Field type with invalid JSON schema fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldType()
  candidate.jsonSchema = { type: 'invalidType' }
  expect(() => ensureFieldTypesAreValid(ajv, [candidate])).toThrow(/Unable to create field value validator/)
})

test('Field type with invalid example value fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldType()
  candidate.docExamples.push('is not a number')
  expect(() => ensureFieldTypesAreValid(ajv, [candidate])).toThrow(/does not validate with the schema/)
})

test('Field type with valid value in the invalid examples list fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldType()
  candidate.invalidExamples.push(5)
  expect(() => ensureFieldTypesAreValid(ajv, [candidate])).toThrow(/invalid value '5' does [(]but should not[)] validate/)
})
