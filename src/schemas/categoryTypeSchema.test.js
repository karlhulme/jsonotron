/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const categoryTypeSchema = require('./categoryTypeSchema')

test('Accept valid category type schema.', () => {
  const ajv = createCustomisedAjv()

  const validCategoryType = {
    name: 'telephony'
  }

  expect(ajv.validate(categoryTypeSchema, validCategoryType)).toEqual(true)
})

test('Reject category type schema with invalid name.', () => {
  const ajv = createCustomisedAjv()

  const invalidCategoryType = {
    name: '!!telephony!!'
  }

  expect(ajv.validate(categoryTypeSchema, invalidCategoryType)).toEqual(false)
  expect(ajv.errors[0].dataPath).toEqual('.name')
})

test('Reject category type schema with invalid order.', () => {
  const ajv = createCustomisedAjv()

  const invalidCategoryType = {
    name: 'telephony',
    order: '20'
  }

  expect(ajv.validate(categoryTypeSchema, invalidCategoryType)).toEqual(false)
  expect(ajv.errors[0].dataPath).toEqual('.order')
})
