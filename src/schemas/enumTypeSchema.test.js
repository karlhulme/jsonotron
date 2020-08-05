/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const enumTypeSchema = require('./enumTypeSchema')

test('Accept valid enum schema.', () => {
  const ajv = createCustomisedAjv()

  const validEnumType = {
    name: 'countries',
    type: 'enum',
    items: [
      { value: 'en', text: 'England', symbol: 'EN' },
      { value: 'us', text: 'United States', deprecated: false },
      { value: 'fr' }
    ]
  }

  expect(ajv.validate(enumTypeSchema, validEnumType)).toEqual(true)
})

test('Reject enum schema with invalid name.', () => {
  const ajv = createCustomisedAjv()

  const invalidEnumType = {
    name: 'enum field'
  }

  expect(ajv.validate(enumTypeSchema, invalidEnumType)).toEqual(false)
  expect(ajv.errors[0].dataPath).toEqual('.name')
})

test('Reject enum schema with insufficient items.', () => {
  const ajv = createCustomisedAjv()

  const invalidEnumType = {
    name: 'enumField',
    type: 'enum',
    items: []
  }

  expect(ajv.validate(enumTypeSchema, invalidEnumType)).toEqual(false)
  expect(ajv.errors[0].dataPath).toEqual('.items')
})
