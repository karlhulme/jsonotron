import { expect, test } from '@jest/globals'
import { labelValue } from './labelValue'

test('Return the value of a named label.', async () => {
  const obj = { labels: [{ name: 'foo', value: 'bar' }] }

  expect(labelValue(obj, 'foo')).toEqual('bar')
})

test('Return an empty string if the named label is not found.', async () => {
  expect(labelValue(undefined, undefined)).toEqual('')
  expect(labelValue({ labels: [{ name: 'foo', value: 'bar' }] }, undefined)).toEqual('')
  expect(labelValue({ labels: [{ name: 'foo', value: 'bar' }] }, 'other')).toEqual('')
  expect(labelValue({ labels: [{ name: 'foo' }] }, 'foo')).toEqual('')
})
