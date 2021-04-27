import { expect, test } from '@jest/globals'
import { identToSnakeCase } from './identToSnakeCase'

test('Convert an identifier into snake case.', async () => {
  expect(identToSnakeCase('myType')).toEqual('my_type')
  expect(identToSnakeCase('_myType')).toEqual('my_type')
  expect(identToSnakeCase('networkIO')).toEqual('network_io')
  expect(identToSnakeCase('networkIOver')).toEqual('network_i_over')
})
