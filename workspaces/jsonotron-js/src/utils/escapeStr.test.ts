import { expect, test } from '@jest/globals'
import { escapeStr } from './escapeStr'

test('Escape single quotes.', () => {
  expect(escapeStr('a single \' quote')).toEqual('a single \\\' quote')
})

