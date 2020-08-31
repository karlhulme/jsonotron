/* eslint-env jest */
import { createCustomisedAjv } from '../validator'
import { createValueValidatorForSchemaTypeArray } from './createValueValidatorForSchemaTypeArray'

const createValidSchemaType = () => ({
  name: 'candidateSchemaType',
  jsonSchema: {
    type: 'number',
    exclusiveMinimum: 0
  },
  referencedSchemaTypes: [],
  referencedEnumTypes: []
})

test('Can create a schema type array value validator that correctly assesses validity.', () => {
  const ajv = createCustomisedAjv()
  const schemaType = createValidSchemaType()
  const validator = createValueValidatorForSchemaTypeArray(ajv, schemaType, [schemaType], [])

  expect(validator([123, 321])).toEqual(true)
  expect(validator.errors).toEqual(null)

  expect(validator(-123)).toEqual(false)
  expect(validator.errors).not.toEqual(null)

  expect(validator('123')).toEqual(false)
  expect(validator.errors).not.toEqual(null)

  expect(validator({ foo: 'bar' })).toEqual(false)
  expect(validator.errors).not.toEqual(null)

  expect(validator(['foo', 'bar'])).toEqual(false)
  expect(validator.errors).not.toEqual(null)

  expect(validator([-123])).toEqual(false)
  expect(validator.errors).not.toEqual(null)

  expect(validator(['123'])).toEqual(false)
  expect(validator.errors).not.toEqual(null)

  expect(validator([{ foo: 'bar' }])).toEqual(false)
  expect(validator.errors).not.toEqual(null)

  expect(validator(['foo', 'bar'])).toEqual(false)
  expect(validator.errors).not.toEqual(null)

  expect(validator([1])).toEqual(true)
  expect(validator.errors).toEqual(null)
})

test('Fail to create a schema type value validator for a schema with invalid schema.', () => {
  const ajv = createCustomisedAjv()
  const schemaType = createValidSchemaType()
  schemaType.jsonSchema = { type: 'invalid' }
  expect(() => createValueValidatorForSchemaTypeArray(ajv, schemaType, [schemaType], []))
    .toThrow(/Unable to create schema value array validator for 'candidateSchemaType'/)
})
