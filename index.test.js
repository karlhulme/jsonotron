/* eslint-env jest */
const mdl = require('./index')

test('The schemas are exported from the module.', () => {
  expect(mdl).toHaveProperty('apiResourceTypeSchema')
  expect(mdl).toHaveProperty('docTypeSchema')
  expect(mdl).toHaveProperty('enumTypeSchema')
  expect(mdl).toHaveProperty('fieldTypeSchema')
  expect(mdl).toHaveProperty('roleTypeSchema')
})

test('The validation methods are exported from the module.', () => {
  expect(mdl).toHaveProperty('ensureApiResourceTypes')
  expect(mdl).toHaveProperty('ensureDocTypes')
  expect(mdl).toHaveProperty('ensureEnumType')
  expect(mdl).toHaveProperty('ensureFieldTypes')
  expect(mdl).toHaveProperty('ensureRoleType')
})

test('The schema creation methods are exported from the module', () => {
  expect(mdl).toHaveProperty('createJsonSchemaForDocTypeConstructorParameters')
  expect(mdl).toHaveProperty('createJsonSchemaForDocTypeFilterParameters')
  expect(mdl).toHaveProperty('createJsonSchemaForDocTypeInstance')
  expect(mdl).toHaveProperty('createJsonSchemaForDocTypeMergePatch')
  expect(mdl).toHaveProperty('createJsonSchemaForDocTypeOperationParameters')
})

test('The additional helper methods are exported from the module.', () => {
  expect(mdl).toHaveProperty('createApiResourceTypeFromDocType')
  expect(mdl).toHaveProperty('createCustomisedAjv')
  expect(mdl).toHaveProperty('getSystemFieldNames')
})
