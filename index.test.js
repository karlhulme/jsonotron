/* eslint-env jest */
const mdl = require('./index')

test('The doc type validation methods are exported from the module.', () => {
  expect(mdl).toHaveProperty('ensureDocTypesAreValid')
})

test('The field type validation methods are exported from the module.', () => {
  expect(mdl).toHaveProperty('ensureFieldTypesAreValid')

  expect(mdl).toHaveProperty('createJsonSchemaForFieldType')
  expect(mdl).toHaveProperty('createJsonSchemaForFieldTypeArray')
  expect(mdl).toHaveProperty('createFieldTypeArrayValueValidator')
  expect(mdl).toHaveProperty('createFieldTypeValueValidator')
  expect(mdl).toHaveProperty('getJsonSchemaFragmentForFieldType')
  expect(mdl).toHaveProperty('getReferencedFieldTypeNames')
})

test('The role type validation methods are exported from the module.', () => {
  expect(mdl).toHaveProperty('ensureRoleTypesAreValid')
})

test('The schemas are exported from the module.', () => {
  expect(mdl).toHaveProperty('docTypeSchema')
  expect(mdl).toHaveProperty('fieldTypeSchema')
  expect(mdl).toHaveProperty('roleTypeSchema')
})

test('The validator methods are exported from the module.', () => {
  expect(mdl).toHaveProperty('createCustomisedAjv')
})
