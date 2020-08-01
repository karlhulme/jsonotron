/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const { JsonotronFieldTypeValuesValidationError } = require('jsonotron-errors')
const ensureFieldTypeValuesAreValid = require('./ensureFieldTypeValuesAreValid')

const fieldTypes = [{
  name: 'candidateFieldType',
  values: [
    { value: 'example 1' },
    { value: 'example 2' }
  ]
}]

const createValidFieldTypeValues = () => ({
  name: 'candidateFieldType',
  lang: 'en',
  values: [
    { value: 'example 1', text: 'Example 1' },
    { value: 'example 2', text: 'Example 2' }
  ]
})

test('Valid field type values can be verified.', () => {
  const ajv = createCustomisedAjv()
  expect(ensureFieldTypeValuesAreValid(ajv, [createValidFieldTypeValues()], fieldTypes)).toBeUndefined()
})

test('Field type docs values missing text property fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldTypeValues()
  candidate.values.push({ value: 'missing-text-property', text: null })
  expect(() => ensureFieldTypeValuesAreValid(ajv, [candidate], fieldTypes)).toThrow(JsonotronFieldTypeValuesValidationError)
  expect(() => ensureFieldTypeValuesAreValid(ajv, [candidate], fieldTypes)).toThrow(/Unable to validate against fieldTypeValuesSchema/)
})

test('Field type values based on missing underlying field types fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldTypeValues()
  expect(() => ensureFieldTypeValuesAreValid(ajv, [candidate], [])).toThrow(JsonotronFieldTypeValuesValidationError)
  expect(() => ensureFieldTypeValuesAreValid(ajv, [candidate], [])).toThrow(/unknown field type/)
})

test('Field type values that are not unique fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldTypeValues()
  candidate.values.push({ value: 'example 1', text: 'Another copy of example 1' })
  expect(() => ensureFieldTypeValuesAreValid(ajv, [candidate], fieldTypes)).toThrow(JsonotronFieldTypeValuesValidationError)
  expect(() => ensureFieldTypeValuesAreValid(ajv, [candidate], fieldTypes)).toThrow(/Value 'example 1' is not unique/)
})

test('Field type values that are missing value definitions from the underlying field type fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldTypeValues()
  candidate.values.splice(0, 1)
  expect(() => ensureFieldTypeValuesAreValid(ajv, [candidate], fieldTypes)).toThrow(JsonotronFieldTypeValuesValidationError)
  expect(() => ensureFieldTypeValuesAreValid(ajv, [candidate], fieldTypes)).toThrow(/Field type value 'example 1' not defined in field type values./)
})
