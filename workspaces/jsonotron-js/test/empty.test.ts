import { expect, test } from '@jest/globals'
import { parseTypeLibrary } from '../src'

test('An empty set of type resources can be parsed.', () => {
  expect(() => parseTypeLibrary({ resourceStrings: [] })).not.toThrow()
  expect(() => parseTypeLibrary({})).not.toThrow()
  expect(() => parseTypeLibrary()).not.toThrow()
})
