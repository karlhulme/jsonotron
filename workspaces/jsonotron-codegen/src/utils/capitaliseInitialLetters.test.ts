import { expect, test } from '@jest/globals'
import { capitaliseInitialLetters } from './capitaliseInitialLetters'

test('Capitalise initial letters.', async () => {
  expect(capitaliseInitialLetters('hello')).toEqual('Hello')
})

test('Capitalise letters that appear after an underscore.', async () => {
  expect(capitaliseInitialLetters('_first_second')).toEqual('_First_Second')
})
