import { expect, test } from '@jest/globals'
import * as lib from '../src'

test('The parseResources function is exported.', () => {
  expect(lib).toHaveProperty('parseResources')
})

test('The json schema format validators are exported.', () => {
  expect(lib).toHaveProperty('dateTimeLocalFormatValidatorFunc')
  expect(lib).toHaveProperty('dateTimeUtcFormatValidatorFunc')
  expect(lib).toHaveProperty('luhnFormatValidatorFunc')
})

test('The json schema generation functions are exported.', () => {
  expect(lib).toHaveProperty('createJsonSchemaForEnumType')
  expect(lib).toHaveProperty('createJsonSchemaForSchemaType')
})
