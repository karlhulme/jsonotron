/* eslint-env jest */
import { createCustomisedAjv } from '../validator'
import { createValueValidatorForEnumType } from './createValueValidatorForEnumType'

const createValidEnumType = () => ({
  name: 'candidateEnumType',
  type: 'enum',
  items: [
    { value: 'apples' },
    { value: 'oranges' },
    { value: 10 },
    { value: false }
  ]
})

test('Can create an enum type value validator that correctly assesses validity.', () => {
  const ajv = createCustomisedAjv()
  const enumType = createValidEnumType()
  const validator = createValueValidatorForEnumType(ajv, enumType)

  expect(validator(123)).toEqual(false)
  expect(validator('hello')).toEqual(false)
  expect(validator(true)).toEqual(false)
  expect(validator({})).toEqual(false)
  expect(validator([])).toEqual(false)

  expect(validator('apples')).toEqual(true)
  expect(validator('oranges')).toEqual(true)
  expect(validator(10)).toEqual(true)
  expect(validator(false)).toEqual(true)
})
