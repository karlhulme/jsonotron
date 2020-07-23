/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const fieldTypeValuesSchema = require('./fieldTypeValuesSchema')

test('Accept valid field type values schema.', () => {
  const ajv = createCustomisedAjv()

  const validFieldTypeValues = {
    name: 'enumField',
    lang: 'en',
    values: [
      { value: 12, text: 'first' },
      { value: true, text: 'second' },
      { value: 'foo', text: 'third' }
    ]
  }

  expect(ajv.validate(fieldTypeValuesSchema, validFieldTypeValues)).toEqual(true)
})

test('Reject invalid field type values schema that is missing a text value.', () => {
  const ajv = createCustomisedAjv()

  const invalidFieldTypeValues = {
    name: 'enumField',
    lang: 'en',
    values: [
      { value: 12 },
      { value: true, text: 'second' },
      { value: 'foo', text: 'third' }
    ]
  }

  expect(ajv.validate(fieldTypeValuesSchema, invalidFieldTypeValues)).toEqual(false)
})

test('Reject invalid field type values schema that have no values.', () => {
  const ajv = createCustomisedAjv()

  const invalidFieldTypeValues = {
    name: 'enumField',
    lang: 'en',
    values: []
  }

  expect(ajv.validate(fieldTypeValuesSchema, invalidFieldTypeValues)).toEqual(false)
})

test('Reject invalid field type values schema that contains an unexpected property.', () => {
  const ajv = createCustomisedAjv()

  const invalidFieldTypeValues = {
    name: 'enumField',
    lang: 'en',
    unexpected: 'property',
    values: [
      { value: 12, text: 'first' },
      { value: true, text: 'second' },
      { value: 'foo', text: 'third' }
    ]
  }

  expect(ajv.validate(fieldTypeValuesSchema, invalidFieldTypeValues)).toEqual(false)
})
