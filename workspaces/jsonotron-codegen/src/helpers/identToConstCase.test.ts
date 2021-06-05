import { expect, test } from '@jest/globals'
import { identToConstCase } from './identToConstCase'

test('Convert an identifier into const case.', async () => {
  expect(identToConstCase('myType')).toEqual('MY_TYPE')
  expect(identToConstCase('networkIO')).toEqual('NETWORK_IO')
  expect(identToConstCase('networkIOver')).toEqual('NETWORK_I_OVER')
})

test('Convert an undefined into const case.', async () => {
  expect(identToConstCase()).toEqual('')
})
