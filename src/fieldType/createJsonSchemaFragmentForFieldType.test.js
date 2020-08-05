/* eslint-env jest */
const createJsonSchemaFragmentForFieldType = require('./createJsonSchemaFragmentForFieldType')

const fieldType = {
  name: 'fieldType',
  type: 'field',
  jsonSchema: {
    type: 'string'
  }
}

const fieldTypeWithSchemaFunction = {
  name: 'fieldTypeWithSchemaFunction',
  jsonSchema: definitionsPath => ({
    $ref: `${definitionsPath}customType`
  })
}

test('Create json schema fragment of a field type.', () => {
  expect(createJsonSchemaFragmentForFieldType(fieldType, '#/definitions/')).toEqual({ type: 'string' })
})

test('Create json schema of a function-backed field type.', () => {
  expect(createJsonSchemaFragmentForFieldType(fieldTypeWithSchemaFunction, '#/definitions/')).toEqual({ $ref: '#/definitions/customType' })
})
