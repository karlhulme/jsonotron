/* eslint-env jest */
import { deepClone } from './deepClone.js'

test('A clone should be equal in structure.', () => {
  const original = { foo: 'bar ' }
  expect(deepClone(original)).toEqual(original)
})

test('A clone should be different reference.', () => {
  const original = { foo: 'bar ' }
  expect(deepClone(original) === original).toEqual(false)
})
