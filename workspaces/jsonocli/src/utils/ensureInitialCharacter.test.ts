import { expect, test } from '@jest/globals'
import { ensureInitialCharacter } from './ensureInitialCharacter'

test('Prepend underscore to non-alpha initial characters.', async () => {
  expect(ensureInitialCharacter('123')).toEqual('_123')
})

test('Return strings with initial alpha characters unchanged.', async () => {
  expect(ensureInitialCharacter('abc')).toEqual('abc')
})
