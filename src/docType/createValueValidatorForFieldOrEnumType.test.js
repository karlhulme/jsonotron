/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const createValueValidatorForFieldOrEnumType = require('./createValueValidatorForFieldOrEnumType')

const fieldTypes = [{
  name: 'integer',
  type: 'field',
  jsonSchema: {
    type: 'number'
  },
  referencedFieldTypes: [],
  referencedEnumTypes: []
}]

const enumTypes = [{
  name: 'choice',
  type: 'enum',
  items: [
    { value: 'up' },
    { value: 'down' }
  ]
}]

test('A value validator can be created for a field type.', () => {
  const ajv = createCustomisedAjv()
  expect(typeof createValueValidatorForFieldOrEnumType(ajv, fieldTypes[0], false, fieldTypes, enumTypes)).toEqual('function')
})

test('A value validator can be created for a field type array.', () => {
  const ajv = createCustomisedAjv()
  expect(typeof createValueValidatorForFieldOrEnumType(ajv, fieldTypes[0], true, fieldTypes, enumTypes)).toEqual('function')
})

test('A value validator can be created for an enum type.', () => {
  const ajv = createCustomisedAjv()
  expect(typeof createValueValidatorForFieldOrEnumType(ajv, enumTypes[0], false, fieldTypes, enumTypes)).toEqual('function')
})

test('A value validator can be created for an enum type array.', () => {
  const ajv = createCustomisedAjv()
  expect(typeof createValueValidatorForFieldOrEnumType(ajv, enumTypes[0], true, fieldTypes, enumTypes)).toEqual('function')
})
