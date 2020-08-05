/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const createValueValidatorForFieldType = require('./createValueValidatorForFieldType')

const createValidFieldType = () => ({
  name: 'candidateFieldType',
  type: 'field',
  category: 'candidate',
  description: 'A candidate field type.',
  jsonSchema: {
    type: 'number',
    exclusiveMinimum: 0
  },
  referencedFieldTypes: [],
  referencedEnumTypes: []
})

test('Can create a field type value validator that correctly assesses validity.', () => {
  const ajv = createCustomisedAjv()
  const fieldType = createValidFieldType()
  const validator = createValueValidatorForFieldType(ajv, fieldType, [fieldType], [])

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
  const fieldType = createValidFieldType()
  fieldType.jsonSchema = { type: 'invalid' }
  expect(() => createValueValidatorForFieldType(ajv, fieldType, [fieldType], []))
    .toThrow(/Unable to create field value validator for 'candidateFieldType'/)
})
