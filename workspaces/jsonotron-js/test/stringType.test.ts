import { expect, test } from '@jest/globals'
import { parseTypeLibrary, TestCaseInvalidationError, TestCaseValidationError, ValueValidationError, ValueValidator } from '../src'
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

const stringTypeWithTestCases = reindentYaml(`
  ---
  kind: string
  system: test
  name: testStringWithTestCases
  summary: A test string with test cases.
  minimumLength: 8
  maximumLength: 15
  regex: ^[a-z_]*$
  validTestCases:
  - value: abcdefgh
    summary: An example value
  invalidTestCases:
  - value: abCDEfgh
`)

function setupValidator () {
  const typeLibrary = parseTypeLibrary({ resourceStrings: [stringType, stringTypeWithTestCases] })
  const validator = new ValueValidator(typeLibrary, TEST_DOMAIN)
  return validator
}

test('A valid string type can be parsed.', async () => {
  expect(() => parseTypeLibrary({ resourceStrings: [stringType] })).not.toThrow()
  expect(() => parseTypeLibrary({ resourceStrings: [stringTypeWithTestCases] })).not.toThrow()
})

test('A string type that describes a valid test case that is actually not valid is rejected.', async () => {
  const stringTypeWithWrongTestCase = reindentYaml(`
    ---
    kind: string
    system: test
    name: testString
    summary: A test string.
    regex: ^[a-z]*$
    maximumLength: 10
    validTestCases:
    - value: abc1def # the 1 makes this invalid
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [stringTypeWithWrongTestCase] })).toThrow(asError(TestCaseValidationError))
})

test('A string type that describes an invalid test case that is actually valid is rejected.', async () => {
  const stringTypeWithWrongInvalidTestCase = reindentYaml(`
    ---
    kind: string
    system: test
    name: testString
    summary: A test string.
    regex: ^[a-z]*$
    maximumLength: 10
    invalidTestCases:
    - value: abcdef # this is actually fine
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [stringTypeWithWrongInvalidTestCase] })).toThrow(asError(TestCaseInvalidationError))
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

test('A string that does not conform to the regex is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testString', 'hello_WORLD')).toThrow(asError(ValueValidationError))
})
