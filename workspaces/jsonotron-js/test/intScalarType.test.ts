import { expect, test } from '@jest/globals'
import { parseTypeLibrary, ValueValidationError, ValueValidator } from '../src'
import { reindentYaml, TEST_DOMAIN, asError } from './shared.test'

const intType = reindentYaml(`
  ---
  kind: intScalar
  system: test
  name: testInt
  summary: A test int.
  minimum: 3
  maximum: 6
`)

function setupValidator () {
  const typeLibrary = parseTypeLibrary({ resourceStrings: [intType] })
  const validator = new ValueValidator(typeLibrary, TEST_DOMAIN)
  return validator
}

test('A valid int scalar type can be parsed.', async () => {
  expect(() => parseTypeLibrary({ resourceStrings: [intType] })).not.toThrow()
})

test('A valid int scalar value passes validation.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testInt', 3)).not.toThrow()
  expect(() => validator.validateValue('test/testInt', 4)).not.toThrow()
  expect(() => validator.validateValue('test/testInt', 5)).not.toThrow()
  expect(() => validator.validateValue('test/testInt', 6)).not.toThrow()
})

test('An int scalar that is below the minimum is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testInt', 2)).toThrow(asError(ValueValidationError))
})

test('An int scalar that is above the maximum is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testInt', 7)).toThrow(asError(ValueValidationError))
})
