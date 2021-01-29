import { expect, test } from '@jest/globals'
import { capitalizeInitialLetters } from './capitalizeInitialLetters'

test('First letter of a string can be capitalised.', () => {
  expect(capitalizeInitialLetters('hello_all')).toEqual('Hello_All')
  expect(capitalizeInitialLetters('[hello_all]')).toEqual('[Hello_All]')
  expect(capitalizeInitialLetters('hello')).toEqual('Hello')
  expect(capitalizeInitialLetters('h')).toEqual('H')
  expect(capitalizeInitialLetters('')).toEqual('')
})

