/* eslint-env jest */
const mdl = require('./index')

test('The schemas are exported from the module.', () => {
  expect(mdl).toHaveProperty('docTypeSchema')
  expect(mdl).toHaveProperty('fieldTypeSchema')
  expect(mdl).toHaveProperty('roleTypeSchema')
})

test('The custom validator keywords are exported from the module.', () => {
  expect(mdl).toHaveProperty('customTypeOfGenerator')
})
