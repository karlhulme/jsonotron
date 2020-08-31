/* eslint-env jest */
import {
  createCustomisedAjv,
  createEnumTypeSchema, validateEnumType, patchEnumType,
  createSchemaTypeSchema, validateSchemaType, patchSchemaType,
  validateTypeSystem
} from './index'

test('The json validator functions are exported.', () => {
  expect(createCustomisedAjv).toBeDefined()
})

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

test('The functions for validating a type system are exported.', () => {
  expect(validateTypeSystem).toBeDefined()
})
