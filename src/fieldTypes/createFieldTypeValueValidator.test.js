/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const createFieldTypeValueValidator = require('./createFieldTypeValueValidator')

const createValidFieldType = () => ({
  name: 'candidateFieldType',
  type: 'schema',
  category: 'candidate',
  description: 'A candidate field type.',
  jsonSchema: {
    type: 'number',
    exclusiveMinimum: 0
  }
})

const createInvalidFieldType = () => ({
  name: 'invalidFieldType',
  type: 'schema',
  category: 'candidate',
  description: 'An invalid field type.',
  jsonSchema: {
    type: 'invalid'
  }
})

test('Can create a field type value validator that correctly assesses validity.', () => {
  const ajv = createCustomisedAjv()
  const validator = createFieldTypeValueValidator(ajv, [createValidFieldType()], 'candidateFieldType')

  expect(validator(123)).toEqual(true)
  expect(validator.errors).toEqual(null)

  expect(validator(-123)).toEqual(false)
  expect(validator.errors).not.toEqual(null)

  expect(validator('123')).toEqual(false)
  expect(validator.errors).not.toEqual(null)

  expect(validator({ foo: 'bar' })).toEqual(false)
  expect(validator.errors).not.toEqual(null)

  expect(validator(['foo', 'bar'])).toEqual(false)
  expect(validator.errors).not.toEqual(null)

  expect(validator(1)).toEqual(true)
  expect(validator.errors).toEqual(null)
})

test('Fail to create a field type value validator for a field with invalid schema.', () => {
  const ajv = createCustomisedAjv()
  expect(() => createFieldTypeValueValidator(ajv, [createInvalidFieldType()], 'invalidFieldType')).toThrow(/Unable to create field value validator for 'invalidFieldType'/)
})
