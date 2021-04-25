import { expect, test } from '@jest/globals'
import { parseTypeLibrary, ValueValidationError, ValueValidator } from '../src'
import { reindentYaml, TEST_DOMAIN, asError } from './shared.test'

const floatType = reindentYaml(`
  ---
  kind: floatScalar
  system: test
  name: testFloat
  summary: A test int.
  minimum: 1.2
  maximum: 1.8
`)

const floatTypeWithExclusives = reindentYaml(`
  ---
  kind: floatScalar
  system: test
  name: testFloatWithExclusives
  summary: A test int.
  minimum: 1.2
  isMinimumExclusive: true
  maximum: 1.8
  isMaximumExclusive: true
`)

function setupValidator () {
  const typeLibrary = parseTypeLibrary({ resourceStrings: [floatType, floatTypeWithExclusives] })
  const validator = new ValueValidator(typeLibrary, TEST_DOMAIN)
  return validator
}

test('A valid float scalar type can be parsed.', async () => {
  expect(() => parseTypeLibrary({ resourceStrings: [floatType] })).not.toThrow()
  expect(() => parseTypeLibrary({ resourceStrings: [floatTypeWithExclusives] })).not.toThrow()
})

test('A valid float scalar value passes validation.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testFloat', 1.2)).not.toThrow()
  expect(() => validator.validateValue('test/testFloat', 1.5)).not.toThrow()
  expect(() => validator.validateValue('test/testFloat', 1.8)).not.toThrow()
})

test('A float scalar that is below the minimum is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testFloat', 1.1)).toThrow(asError(ValueValidationError))
})

test('A float scalar that is above the maximum is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testFloat', 1.9)).toThrow(asError(ValueValidationError))
})

test('A float scalar that is equal to the exclusive minimum is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testFloatWithExclusives', 1.2)).toThrow(asError(ValueValidationError))
})

test('A float scalar that is equal to the exclusive maximum is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/testFloatWithExclusives', 1.9)).toThrow(asError(ValueValidationError))
})
