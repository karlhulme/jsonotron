/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const categoryDocsSchema = require('./categoryDocsSchema')

test('Accept valid category docs schema.', () => {
  const ajv = createCustomisedAjv()

  const validCategoryDocs = {
    name: 'telephony',
    lang: 'en',
    title: 'Telephony'
  }

  expect(ajv.validate(categoryDocsSchema, validCategoryDocs)).toEqual(true)
})

test('Reject invalid category docs schema with invalid title.', () => {
  const ajv = createCustomisedAjv()

  const invalidCategoryDocs = {
    name: 'telephony',
    lang: 'en',
    title: 123
  }

  expect(ajv.validate(categoryDocsSchema, invalidCategoryDocs)).toEqual(false)
})

test('Reject invalid category docs schema with invalid lang.', () => {
  const ajv = createCustomisedAjv()

  const invalidCategoryDocs = {
    name: 'telephony',
    lang: 'EN',
    title: 'Telephony'
  }

  expect(ajv.validate(categoryDocsSchema, invalidCategoryDocs)).toEqual(false)
})
