import { expect, test } from '@jest/globals'
import { parseTypeLibrary, UnrecognisedTypeError, ValueValidationError, ValueValidator } from '../src'
import { reindentYaml, TEST_DOMAIN, otherType, asError } from './shared.test'

const arrayType = reindentYaml(`
  ---
  kind: array
  system: test
  name: testArray
  summary: A test array.
  elementType: test/other
  minimumLength: 2
  maximumLength: 10
`)

function setupValidator () {
  const typeLibrary = parseTypeLibrary({ resourceStrings: [arrayType, otherType] })
  const validator = new ValueValidator(typeLibrary, TEST_DOMAIN)
  return validator
}

test('A valid array type can be parsed.', async () => {
  expect(() => parseTypeLibrary({ resourceStrings: [arrayType, otherType] })).not.toThrow()
})

test('An array type that references an unknown type cannot be parsed.', async () => {
  const arrayTypeWithInvalidElementType = reindentYaml(`
    ---
    kind: array
    system: test
    name: testArray
    summary: A test array.
    elementType: test/unrecognised
    minimumLength: 2
    maximumLength: 10
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [arrayTypeWithInvalidElementType] })).toThrow(asError(UnrecognisedTypeError))
})

test('A valid array value passes validation.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testArray', [1, 2, 3])).not.toThrow()
})

test('An array with an element of an invalid type is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testArray', [1, 2, 'three'])).toThrow(asError(ValueValidationError))
})

test('An array that does not contain the minimum number of elements is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testArray', [1])).toThrow(asError(ValueValidationError))
})

test('An array that contains more than the maximum number of elements is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testArray', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])).toThrow(asError(ValueValidationError))
})
