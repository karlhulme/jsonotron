import { expect, test } from '@jest/globals'
import * as lib from '../src'

test('The parsing functions are exported.', () => {
  expect(lib).toHaveProperty('filterTypeLibrary')
  expect(lib).toHaveProperty('parseTypeLibrary')
  expect(lib).toHaveProperty('ValueValidator')
})

test('The json schema format validators are exported.', () => {
  expect(lib).toHaveProperty('dateTimeLocalFormatValidatorFunc')
  expect(lib).toHaveProperty('dateTimeUtcFormatValidatorFunc')
  expect(lib).toHaveProperty('luhnFormatValidatorFunc')
})

test('The domain and system name functions are exported', () => {
  expect(lib).toHaveProperty('getDomainQualifiedTypeReference')
})
