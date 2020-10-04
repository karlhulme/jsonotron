import { expect, test } from '@jest/globals'
import { pascalToTitleCase } from './pascalToTitleCase.js'

test('Can convert pascal names to title case.', () => {
  expect(pascalToTitleCase('helloWorld')).toEqual('Hello World')
  expect(pascalToTitleCase('HelloWorld')).toEqual('Hello World')
})
