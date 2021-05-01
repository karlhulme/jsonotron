import { expect, test } from '@jest/globals'
import { stringify } from './stringify'

test('Return stringified object content.', async () => {
  const obj = { foo: 'bar' }

  expect(stringify(obj)).toEqual('{"foo":"bar"}')
})

test('Return stringified null content.', async () => {
  expect(stringify(null)).toEqual('null')
})

test('Fail to stringify undefined content.', async () => {
  expect(stringify(undefined)).toEqual(undefined)
})
