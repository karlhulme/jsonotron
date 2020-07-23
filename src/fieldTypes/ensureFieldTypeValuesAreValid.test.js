/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const { JsonotronFieldTypeValuesValidationError } = require('jsonotron-errors')
const ensureFieldTypeValuesAreValid = require('./ensureFieldTypeValuesAreValid')

const createValidFieldTypeValues = () => ({
  name: 'candidateFieldTypeDocs',
  lang: 'en',
  values: [
    { value: 'example 1', text: 'Example 1' },
    { value: 'example 2', text: 'Example 2' }
  ]
})

test('Valid field type docs can be verified.', () => {
  const ajv = createCustomisedAjv()
  expect(ensureFieldTypeValuesAreValid(ajv, [createValidFieldTypeValues()])).toBeUndefined()
})

test('Field type docs with missing title fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldTypeValues()
  candidate.values.push({ value: 'missing-text-property' })
  expect(() => ensureFieldTypeValuesAreValid(ajv, [candidate])).toThrow(JsonotronFieldTypeValuesValidationError)
})
