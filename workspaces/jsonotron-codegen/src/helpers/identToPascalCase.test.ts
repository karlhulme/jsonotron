import { expect, test } from '@jest/globals'
import { identToPascalCase } from './identToPascalCase'

test('Convert an identifier into pascal case.', async () => {
  expect(identToPascalCase('myType')).toEqual('MyType')
  expect(identToPascalCase('my_type')).toEqual('My_Type')
  expect(identToPascalCase('_myType')).toEqual('_MyType')
})

test('Convert an undefined into pascal case.', async () => {
  expect(identToPascalCase()).toEqual('')
})
