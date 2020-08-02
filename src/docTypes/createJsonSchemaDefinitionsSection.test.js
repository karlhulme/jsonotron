/* eslint-env jest */
const createJsonSchemaDefinitionsSection = require('./createJsonSchemaDefinitionsSection')

const fieldTypes = [{
  name: 'currencyCode',
  jsonSchema: { type: 'string' }
}, {
  name: 'integer',
  jsonSchema: { type: 'integer' }
}, {
  name: 'money',
  jsonSchema: { type: 'float' }
}]

test('Build a JSON Schema definitions section.', () => {
  expect(createJsonSchemaDefinitionsSection(fieldTypes, ['currencyCode', 'integer', 'money'])).toEqual({
    currencyCode: { type: 'string' },
    integer: { type: 'integer' },
    money: { type: 'float' }
  })
})

test('Fail to build a JSON Schema definitions section if a referenced type is not in the list of field types.', () => {
  expect(() => createJsonSchemaDefinitionsSection(fieldTypes, ['invalid'])).toThrow(/Unable to find referenced field type/)
})
