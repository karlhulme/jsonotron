import { expect, test } from '@jest/globals'
import { wrapArrayIndicators } from './wrapArrayindicators'

test('Wrap no array indicators correctly.', async () => {
  expect(wrapArrayIndicators(0, 'myType')).toEqual('myType')
})

test('Wrap a single set of array indicators correctly.', async () => {
  expect(wrapArrayIndicators(1, 'myType')).toEqual('[myType]')
})

test('Wrap multiple array indicators correctly.', async () => {
  expect(wrapArrayIndicators(2, 'myType')).toEqual('[[myType]]')
})

