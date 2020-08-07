/* eslint-env jest */
const mdl = require('./index')

test('The schemas are exported from the module.', () => {
  expect(mdl).toHaveProperty('categoryTypeSchema')
  expect(mdl).toHaveProperty('docTypeSchema')
  expect(mdl).toHaveProperty('enumTypeSchema')
  expect(mdl).toHaveProperty('fieldTypeSchema')
  expect(mdl).toHaveProperty('roleTypeSchema')
})

test('The validation methods are exported from the module.', () => {
  expect(mdl).toHaveProperty('ensureCategoryType')
  expect(mdl).toHaveProperty('ensureDocTypes')
  expect(mdl).toHaveProperty('ensureEnumType')
  expect(mdl).toHaveProperty('ensureFieldTypes')
  expect(mdl).toHaveProperty('ensureRoleType')
})

test('The schema creation methods are exported from the module', () => {
  expect(mdl).toHaveProperty('createJsonSchemaForConstructorParameters')
  expect(mdl).toHaveProperty('createJsonSchemaForFilterParameters')
  expect(mdl).toHaveProperty('createJsonSchemaForInstance')
  expect(mdl).toHaveProperty('createJsonSchemaForMergePatch')
  expect(mdl).toHaveProperty('createJsonSchemaForOperationParameters')
})

test('The additional helper methods are exported from the module.', () => {
  expect(mdl).toHaveProperty('createCustomisedAjv')
  expect(mdl).toHaveProperty('getSystemFieldNames')
})
