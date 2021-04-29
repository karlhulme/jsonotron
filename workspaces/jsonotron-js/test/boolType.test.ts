import { expect, test } from '@jest/globals'
import { parseTypeLibrary, ValueValidationError, ValueValidator } from '../src'
import { reindentYaml, TEST_DOMAIN, asError } from './shared.test'

const boolType = reindentYaml(`
  ---
  kind: bool
  system: test
  name: testBool
  summary: A test boolean.
`)

function setupValidator () {
  const typeLibrary = parseTypeLibrary({ resourceStrings: [boolType], domain: TEST_DOMAIN })
  const validator = new ValueValidator(typeLibrary)
  return validator
}

test('A valid bool type can be parsed.', async () => {
  expect(() => parseTypeLibrary({ resourceStrings: [boolType] })).not.toThrow()
})

test('A valid bool value passes validation.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testBool', true)).not.toThrow()
  expect(() => validator.validateValue('test/testBool', false)).not.toThrow()
})

test('An invalid bool value is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testBool', 0)).toThrow(asError(ValueValidationError))
  expect(() => validator.validateValue('test/testBool', 1)).toThrow(asError(ValueValidationError))
})
