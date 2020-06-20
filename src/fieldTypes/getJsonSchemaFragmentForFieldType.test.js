/* eslint-env jest */
const getJsonSchemaFragmentForFieldType = require('./getJsonSchemaFragmentForFieldType')

const enumFieldType = {
  name: 'enumFieldType',
  values: [
    { value: 'apple', description: 'An apple' },
    { value: 'banana', description: 'A banana' },
    { value: 3, description: 'The value three.' }
  ]
}

const schemaBackedFieldType = {
  name: 'schemaBackedFieldType',
  jsonSchema: {
    type: 'string'
  }
}

const schemaFunctionBackedFieldType = {
  name: 'schemaFunctionBackedFieldType',
  jsonSchema: definitionsPath => ({
    $ref: `${definitionsPath}customType`
  })
}

const invalidFieldType = {
  name: 'invalidFieldType'
}

test('Get JSON schema of an enum field type.', () => {
  expect(getJsonSchemaFragmentForFieldType(enumFieldType)).toEqual({ enum: ['apple', 'banana', 3] })
})

test('Get JSON schema of a schema-backed field type.', () => {
  expect(getJsonSchemaFragmentForFieldType(schemaBackedFieldType)).toEqual({ type: 'string' })
})

test('Get JSON schema of a schema-function-backed field type.', () => {
  expect(getJsonSchemaFragmentForFieldType(schemaFunctionBackedFieldType)).toEqual({ $ref: '#/definitions/customType' })
  expect(getJsonSchemaFragmentForFieldType(schemaFunctionBackedFieldType, '#/comps/')).toEqual({ $ref: '#/comps/customType' })
})

test('Get JSON schema of an invalid field type.', () => {
  expect(() => getJsonSchemaFragmentForFieldType(invalidFieldType)).toThrow()
})
