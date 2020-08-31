/* eslint-env jest */
import {
  createEnumTypeSchema, validateEnumType, patchEnumType,
  createSchemaTypeSchema, validateSchemaType, patchSchemaType,
  validateTypeSystem,
  consts, createCustomisedAjv, ValidationResult
} from './index'

test('The functions for handling enums types are exported.', () => {
  expect(createEnumTypeSchema).toBeDefined()
  expect(validateEnumType).toBeDefined()
  expect(patchEnumType).toBeDefined()
})

test('The functions for handling schema types are exported.', () => {
  expect(createSchemaTypeSchema).toBeDefined()
  expect(validateSchemaType).toBeDefined()
  expect(patchSchemaType).toBeDefined()
})

test('The type system functions are exported.', () => {
  expect(validateTypeSystem).toBeDefined()
})

test('The constants and utility functions are exported.', () => {
  expect(consts).toBeDefined()
  expect(createCustomisedAjv).toBeDefined()
  expect(ValidationResult).toBeDefined()
})
