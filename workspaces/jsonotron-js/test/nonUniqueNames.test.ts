import { expect, test } from '@jest/globals'
import { parseTypeLibrary, DuplicateTypeNameError } from '../src'
import { asError, reindentYaml } from './shared.test'

const testTypeA = reindentYaml(`
  ---
  kind: int
  system: test
  name: testType
  summary: A test int.
  minimum: 3
  maximum: 6
`)

const testTypeB = reindentYaml(`
  ---
  kind: float
  system: test
  name: testType
  summary: A test float.
  minimum: 8.5
  maximum: 11.9
`)

test('Two types with the same system-name cannot be parsed.', async () => {
  expect(() => parseTypeLibrary({ resourceStrings: [testTypeA, testTypeB] })).toThrow(asError(DuplicateTypeNameError))
})
