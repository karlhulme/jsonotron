import { expect, test } from '@jest/globals'
import { stringifyPretty } from './stringifyPretty'

test('Return stringified object content.', async () => {
  const obj = { foo: 'bar' }

  expect(stringifyPretty(obj)).toEqual('{\n  "foo": "bar"\n}')
})

test('Return stringified null content.', async () => {
  expect(stringifyPretty(null)).toEqual('null')
})

test('Fail to stringify undefined content.', async () => {
  expect(stringifyPretty(undefined)).toEqual(undefined)
})
