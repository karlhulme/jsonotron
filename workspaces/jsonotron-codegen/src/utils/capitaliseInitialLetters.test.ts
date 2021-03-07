import { expect, test } from '@jest/globals'
import { capitaliseInitialLetters } from './capitaliseInitialLetters'

test('Capitalise initial letters.', async () => {
  expect(capitaliseInitialLetters('hello_world')).toEqual('Hello_World')
})
