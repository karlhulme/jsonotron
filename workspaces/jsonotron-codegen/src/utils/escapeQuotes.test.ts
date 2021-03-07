import { expect, test } from '@jest/globals'
import { escapeQuotes } from './escapeQuotes'

test('Escape single quotes.', () => {
  expect(escapeQuotes('a single \' quote')).toEqual('a single \\\' quote')
})

