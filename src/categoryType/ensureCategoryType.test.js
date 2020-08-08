/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const { JsonotronCategoryTypeDocumentationMissingError, JsonotronCategoryTypeValidationError } = require('jsonotron-errors')
const ensureCategoryType = require('./ensureCategoryType')

function createValidCategoryType () {
  return {
    name: 'candidateCategory',
    order: 10,
    title: 'Candidate Category'
  }
}

function createMinimalCategoryType () {
  return {
    name: 'minimalCategory'
  }
}

test('Valid category type can be verified.', () => {
  const ajv = createCustomisedAjv()
  expect(() => ensureCategoryType(ajv, createValidCategoryType())).not.toThrow()
})

test('Minimal category type can be verified.', () => {
  const ajv = createCustomisedAjv()
  const cat = createMinimalCategoryType()
  expect(() => ensureCategoryType(ajv, cat)).not.toThrow()
  expect(cat.order).toEqual(1000)
  expect(cat.title).toEqual('Minimal Category')
})

test('Minimal category type yields documentation errors.', () => {
  const ajv = createCustomisedAjv()
  const cat1 = createMinimalCategoryType()
  expect(() => ensureCategoryType(ajv, cat1, true)).toThrow(JsonotronCategoryTypeDocumentationMissingError)
  const cat2 = createMinimalCategoryType()
  expect(() => ensureCategoryType(ajv, cat2, true)).toThrow(/title/)
})

test('Category type with invalid name fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidCategoryType()
  candidate.name = '%invalid%'
  expect(() => ensureCategoryType(ajv, candidate)).toThrow(JsonotronCategoryTypeValidationError)
  expect(() => ensureCategoryType(ajv, candidate)).toThrow(/name/)
})
