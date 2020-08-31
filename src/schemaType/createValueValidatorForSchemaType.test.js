/* eslint-env jest */
import { createCustomisedAjv } from '../validator'
import { createValueValidatorForSchemaType } from './createValueValidatorForSchemaType'

const createValidSchemaType = () => ({
  name: 'candidateSchemaType',
  description: 'A candidate schema type.',
  jsonSchema: {
    type: 'number',
    exclusiveMinimum: 0
  },
  referencedSchemaTypes: [],
  referencedEnumTypes: []
})

test('Can create a schema type value validator that correctly assesses validity.', () => {
  const ajv = createCustomisedAjv()
  const schemaType = createValidSchemaType()
  const validator = createValueValidatorForSchemaType(ajv, schemaType, [schemaType], [])

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

test('Fail to create a schema type value validator for a schema with invalid schema.', () => {
  const ajv = createCustomisedAjv()
  const schemaType = createValidSchemaType()
  schemaType.jsonSchema = { type: 'invalid' }
  expect(() => createValueValidatorForSchemaType(ajv, schemaType, [schemaType], []))
    .toThrow(/Unable to create schema value validator for 'candidateSchemaType'/)
})
