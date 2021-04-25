import { expect, test } from '@jest/globals'
import { parseTypeLibrary, ParseYamlError } from '../src'
import { asError } from './shared.test'

test('A malformed type cannot be parsed.', async () => {
  const malformedType = '--\nnot: a valid yaml file due to insufficient hyphens'
  expect(() => parseTypeLibrary({ resourceStrings: [malformedType] })).toThrow(asError(ParseYamlError))
})
