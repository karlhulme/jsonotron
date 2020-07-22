/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const { JsonotronFieldTypeValidationError } = require('jsonotron-errors')
const ensureFieldTypesAreValid = require('./ensureFieldTypesAreValid')

const createValidFieldType = () => ({
  name: 'candidateFieldType',
  type: 'schema',
  category: 'candidate',
  validTestCases: [4, 5, 6],
  invalidTestCases: ['a string', '', null, true, {}, [], -34.56, -1, 0],
  jsonSchema: {
    type: 'number',
    exclusiveMinimum: 0
  }
})

const createValidEnumFieldType = () => ({
  name: 'candidateFieldType',
  type: 'enum',
  category: 'candidate',
  values: [
    { value: 'A', description: 'The first letter of the alphabet.' },
    { value: 'B', description: 'The second letter of the alphabet.' }
  ]
})

test('Valid field type can be verified.', () => {
  const ajv = createCustomisedAjv()
  expect(ensureFieldTypesAreValid(ajv, [createValidFieldType()])).toBeUndefined()
})

test('Valid enum field type can be verified.', () => {
  const ajv = createCustomisedAjv()
  expect(ensureFieldTypesAreValid(ajv, [createValidEnumFieldType()])).toBeUndefined()
})

test('Regular field type with empty values array fails verification.', () => {
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

test('Field type with invalid value in the valid test cases list fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldType()
  candidate.validTestCases.push('invalid-value')
  expect(() => ensureFieldTypesAreValid(ajv, [candidate])).toThrow(/should be number/)
})

test('Field type with valid value in the invalid test cases list fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldType()
  candidate.invalidTestCases.push(5)
  expect(() => ensureFieldTypesAreValid(ajv, [candidate])).toThrow(/invalid value '5' does [(]but should not[)] validate/)
})
