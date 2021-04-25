import { expect, test } from '@jest/globals'
import { EnumScalarTypeItemDataValidationError, parseTypeLibrary, UnrecognisedTypeError, ValueValidationError, ValueValidator } from '../src'
import { reindentYaml, TEST_DOMAIN, asError, otherType } from './shared.test'

const enumScalarType = reindentYaml(`
  ---
  kind: enumScalar
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

const enumScalarTypeWithData = reindentYaml(`
  ---
  kind: enumScalar
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
  const typeLibrary = parseTypeLibrary({ resourceStrings: [enumScalarType, enumScalarTypeWithData, otherType] })
  const validator = new ValueValidator(typeLibrary, TEST_DOMAIN)
  return validator
}

test('A valid enum scalar type can be parsed.', async () => {
  expect(() => parseTypeLibrary({ resourceStrings: [enumScalarType, otherType] })).not.toThrow()
  expect(() => parseTypeLibrary({ resourceStrings: [enumScalarTypeWithData, otherType] })).not.toThrow()
})

test('An enum scalar type that refers to a unknown data type cannot be parsed.', async () => {
  const enumScalarTypeWithInvalidDataType = reindentYaml(`
    ---
    kind: enumScalar
    system: test
    name: enumScalarTypeWithInvalidDataType
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

test('An enum scalar type that defines items with invalid data cannot be parsed.', async () => {
  const enumScalarTypeWithInvalidData = reindentYaml(`
    ---
    kind: enumScalar
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

test('A valid enum scalar value passes validation.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testEnum', 'apple')).not.toThrow()
  expect(() => validator.validateValue('test/testEnum', 'banana')).not.toThrow()
  expect(() => validator.validateValue('test/testEnumWithData', 'apple')).not.toThrow()
  expect(() => validator.validateValue('test/testEnumWithData', 'banana')).not.toThrow()
})

test('An enum scalar that is not a valid value is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testEnum', 'carrot')).toThrow(asError(ValueValidationError))
  expect(() => validator.validateValue('test/testEnumWithData', 'carrot')).toThrow(asError(ValueValidationError))
})
