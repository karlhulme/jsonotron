import { expect, test } from '@jest/globals'
import { EnumScalarTypeItemDataValidationError, parseTypeLibrary, UnrecognisedTypeError, ValueValidationError, ValueValidator } from '../src'
import { reindentYaml, TEST_DOMAIN, asError, otherType } from './shared.test'

const enumType = reindentYaml(`
  ---
  kind: enum
  system: test
  name: testEnum
  summary: A test enum.
  items:
  - value: apple
    text: Apple
    symbol: APL
    summary: This is an apple item.
  - value: banana
    text: Banana
    symbol: BAN
    summary: This is a banana item.
    deprecated: Best to eat apples instead.
`)

const enumTypeWithData = reindentYaml(`
  ---
  kind: enum
  system: test
  name: testEnumWithData
  summary: A test enum.
  dataType: other
  items:
  - value: apple
    text: Apple
    symbol: APL
    data: 1
    summary: This is an apple item.
  - value: banana
    text: Banana
    symbol: BAN
    data: 2
    summary: This is a banana item.
    deprecated: Best to eat apples instead.
`)

function setupValidator () {
  const typeLibrary = parseTypeLibrary({ resourceStrings: [enumType, enumTypeWithData, otherType] })
  const validator = new ValueValidator(typeLibrary, TEST_DOMAIN)
  return validator
}

test('A valid enum type can be parsed.', async () => {
  expect(() => parseTypeLibrary({ resourceStrings: [enumType, otherType] })).not.toThrow()
  expect(() => parseTypeLibrary({ resourceStrings: [enumTypeWithData, otherType] })).not.toThrow()
})

test('An enum type that refers to a unknown data type cannot be parsed.', async () => {
  const enumScalarTypeWithInvalidDataType = reindentYaml(`
    ---
    kind: enum
    system: test
    name: enumTypeWithInvalidDataType
    summary: A test enum.
    dataType: test/unrecognised
    items:
    - value: apple
      text: Apple
      symbol: APL
      data: hello
      summary: This is an apple item.
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [enumScalarTypeWithInvalidDataType] })).toThrow(asError(UnrecognisedTypeError))
})

test('An enum type that defines items with invalid data cannot be parsed.', async () => {
  const enumScalarTypeWithInvalidData = reindentYaml(`
    ---
    kind: enum
    system: test
    name: testEnumWithData
    summary: A test enum.
    dataType: test/other
    items:
    - value: apple
      text: Apple
      symbol: APL
      data: hello
      summary: This is an apple item.
    - value: banana
      text: Banana
      symbol: BAN
      data: world
      summary: This is a banana item.
      deprecated: Best to eat apples instead.
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [enumScalarTypeWithInvalidData, otherType] })).toThrow(asError(EnumScalarTypeItemDataValidationError))
})

test('A valid enum value passes validation.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testEnum', 'apple')).not.toThrow()
  expect(() => validator.validateValue('test/testEnum', 'banana')).not.toThrow()
  expect(() => validator.validateValue('test/testEnumWithData', 'apple')).not.toThrow()
  expect(() => validator.validateValue('test/testEnumWithData', 'banana')).not.toThrow()
})

test('An enum that is not a valid value is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testEnum', 'carrot')).toThrow(asError(ValueValidationError))
  expect(() => validator.validateValue('test/testEnumWithData', 'carrot')).toThrow(asError(ValueValidationError))
})
