import { expect, test } from '@jest/globals'
import { parseTypeLibrary, ValueValidationError, ValueValidator } from '../src'
import { reindentYaml, TEST_DOMAIN, asError } from './shared.test'

const objectType = reindentYaml(`
  ---
  kind: object
  system: test
  name: testObject
  summary: A test object.
`)

function setupValidator () {
  const typeLibrary = parseTypeLibrary({ resourceStrings: [objectType], domain: TEST_DOMAIN })
  const validator = new ValueValidator(typeLibrary)
  return validator
}

test('A valid object type can be parsed.', async () => {
  expect(() => parseTypeLibrary({ resourceStrings: [objectType] })).not.toThrow()
})

test('A valid object value passes validation.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testObject', { foo: 'bar' })).not.toThrow()
})

test('An invalid object value is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testObject', 0)).toThrow(asError(ValueValidationError))
  expect(() => validator.validateValue('test/testObject', [1, 2])).toThrow(asError(ValueValidationError))
  expect(() => validator.validateValue('test/testObject', 'hello')).toThrow(asError(ValueValidationError))
  expect(() => validator.validateValue('test/testObject', 12.34)).toThrow(asError(ValueValidationError))
  expect(() => validator.validateValue('test/testObject', true)).toThrow(asError(ValueValidationError))
})
