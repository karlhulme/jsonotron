import { expect, test } from '@jest/globals'
import { appendArrayIndicators } from './appendArrayIndicators'

test('Append no array indicators correctly.', async () => {
  expect(appendArrayIndicators(0, 'myType')).toEqual('myType')
})

test('Append a single set of array indicators correctly.', async () => {
  expect(appendArrayIndicators(1, 'myType')).toEqual('myType[]')
})

test('Append multiple array indicators correctly.', async () => {
  expect(appendArrayIndicators(2, 'myType')).toEqual('myType[][]')
})

