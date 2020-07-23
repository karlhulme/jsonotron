/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const { JsonotronCategoryValidationError } = require('jsonotron-errors')
const ensureCategoriesAreValid = require('./ensureCategoriesAreValid')

const createValidCategory = () => ({
  name: 'candidateCategory',
  order: 10
})

test('Valid category can be verified.', () => {
  const ajv = createCustomisedAjv()
  expect(ensureCategoriesAreValid(ajv, [createValidCategory()])).toBeUndefined()
})

test('Category with missing order fail verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidCategory()
  delete candidate.order
  expect(() => ensureCategoriesAreValid(ajv, [candidate])).toThrow(JsonotronCategoryValidationError)
})
