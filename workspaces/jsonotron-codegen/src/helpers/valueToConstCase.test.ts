import { expect, test } from '@jest/globals'
import { valueToConstCase } from './valueToConstCase'

test('Convert a value into const case.', async () => {
  expect(valueToConstCase('myType')).toEqual('MY_TYPE')
  expect(valueToConstCase('my Type')).toEqual('MY_TYPE')
  expect(valueToConstCase('my%Type')).toEqual('MY_TYPE')
  expect(valueToConstCase('_my Type')).toEqual('MY_TYPE')
  expect(valueToConstCase('123')).toEqual('_123')
})

test('Convert an undefined into const case.', async () => {
  expect(valueToConstCase()).toEqual('')
})
