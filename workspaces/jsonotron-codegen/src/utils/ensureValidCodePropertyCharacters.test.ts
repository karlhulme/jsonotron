import { expect, test } from '@jest/globals'
import { ensureValidCodePropertyCharacters } from './ensureValidCodePropertyCharacters'

test('Prepend underscore to non-alpha initial characters.', async () => {
  expect(ensureValidCodePropertyCharacters('hello%world')).toEqual('hello_world')
  expect(ensureValidCodePropertyCharacters('%hello%world')).toEqual('_hello_world')
})
