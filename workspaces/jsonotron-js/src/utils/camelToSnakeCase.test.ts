import { expect, test } from '@jest/globals'
import { camelToSnakeCase } from './camelToSnakeCase'

test('Camel case can be converted to snake case.', () => {
  expect(camelToSnakeCase('helloWorld')).toEqual('hello_world')
})
