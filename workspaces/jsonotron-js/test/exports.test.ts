import { expect, test } from '@jest/globals'
import * as lib from '../src'

test('The parsing functions and classes are exported.', () => {
  expect(lib).toHaveProperty('parseTypeLibrary')
  expect(lib).toHaveProperty('ValueValidator')
})

test('The json schema format validators are exported.', () => {
  expect(lib).toHaveProperty('dateTimeLocalFormatValidatorFunc')
  expect(lib).toHaveProperty('dateTimeUtcFormatValidatorFunc')
  expect(lib).toHaveProperty('luhnFormatValidatorFunc')
})
