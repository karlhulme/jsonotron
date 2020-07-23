/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const categorySchema = require('./categorySchema')

test('Accept valid category schema.', () => {
  const ajv = createCustomisedAjv()

  const validCategory = {
    name: 'telephony',
    order: 20
  }

  expect(ajv.validate(categorySchema, validCategory)).toEqual(true)
})

test('Reject invalid category schema.', () => {
  const ajv = createCustomisedAjv()

  const invalidCategory = {
    name: 'telephony',
    order: '20'
  }

  expect(ajv.validate(categorySchema, invalidCategory)).toEqual(false)
})
