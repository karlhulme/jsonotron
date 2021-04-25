import { expect, test } from '@jest/globals'
import { parseTypeLibrary, ValueValidationError, ValueValidator } from '../src'
import { reindentYaml, TEST_DOMAIN, asError } from './shared.test'

const stringType = reindentYaml(`
  ---
  kind: string
  system: test
  name: testString
  summary: A test string.
  minimumLength: 8
  maximumLength: 15
  regex: ^[a-z_]*$
`)

function setupValidator () {
  const typeLibrary = parseTypeLibrary({ resourceStrings: [stringType] })
  const validator = new ValueValidator(typeLibrary, TEST_DOMAIN)
  return validator
}

test('A valid string type can be parsed.', async () => {
  expect(() => parseTypeLibrary({ resourceStrings: [stringType] })).not.toThrow()
})

test('A valid string value passes validation.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testString', 'hello_world')).not.toThrow()
})

test('An string that is below the minimum length is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testString', 'abc')).toThrow(asError(ValueValidationError))
})

test('A string that is above the maximum length is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testString', 'hello_world_foo_bar')).toThrow(asError(ValueValidationError))
})

test('A string that does not conform the regex is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testString', 'hello_WORLD')).toThrow(asError(ValueValidationError))
})
