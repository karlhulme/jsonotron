/* eslint-env jest */
import { createCustomisedAjv } from '../validator'
import { createValueValidatorForEnumTypeArray } from './createValueValidatorForEnumTypeArray'

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
  const validator = createValueValidatorForEnumTypeArray(ajv, enumType)

  expect(validator([123])).toEqual(false)
  expect(validator(['hello'])).toEqual(false)
  expect(validator([true])).toEqual(false)
  expect(validator(5)).toEqual(false)
  expect(validator(['apples', 'wrong'])).toEqual(false)

  expect(validator(['apples'])).toEqual(true)
  expect(validator(['apples', 'oranges'])).toEqual(true)
  expect(validator([10, false])).toEqual(true)
  expect(validator([])).toEqual(true)
})
