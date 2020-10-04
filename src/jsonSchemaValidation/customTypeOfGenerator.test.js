/* eslint-env jest */
import { customTypeOfGenerator } from './customTypeOfGenerator.js'

test('The customTypeOfGenerator recognises functions.', () => {
  const fn = customTypeOfGenerator('function')
  expect(fn(() => {})).toEqual(true)
  expect(fn(123)).toEqual(false)
  expect(fn('not a function')).toEqual(false)
  expect(fn(true)).toEqual(false)
})

test('The customTypeOfGenerator recognises functions within arrays.', () => {
  const fn = customTypeOfGenerator(['function'])
  expect(fn(() => {})).toEqual(true)
  expect(fn(123)).toEqual(false)
  expect(fn(123)).toEqual(false)
  expect(fn('not a function')).toEqual(false)
  expect(fn(true)).toEqual(false)
})

test('The customTypeOfGenerator does not recognise unknown types.', () => {
  const fn = customTypeOfGenerator('invalid')
  expect(fn(() => {})).toEqual(false)
  expect(fn(123)).toEqual(false)
  expect(fn('not a function')).toEqual(false)
  expect(fn(true)).toEqual(false)
})

test('The customTypeOfGenerator does not recognise unknown types within arrays.', () => {
  const fn = customTypeOfGenerator(['invalid1', 'invalid2'])
  expect(fn(() => {})).toEqual(false)
  expect(fn(123)).toEqual(false)
  expect(fn(123)).toEqual(false)
  expect(fn('not a function')).toEqual(false)
  expect(fn(true)).toEqual(false)
})
