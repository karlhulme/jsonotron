/* eslint-env jest */
const createJsonSchemaForFieldType = require('./createJsonSchemaForFieldType')

const fieldTypes = [{
  name: 'example',
  type: 'schema',
  jsonSchema: definitionsPath => ({
    type: 'object',
    properties: {
      first: { $ref: `${definitionsPath}integer` },
      second: { $ref: `${definitionsPath}integer` }
    },
    required: ['first', 'second']
  }),
  referencedFieldTypes: ['integer'],
  referencedEnumTypes: []
}, {
  name: 'integer',
  jsonSchema: {
    type: 'number'
  },
  referencedFieldTypes: [],
  referencedEnumTypes: []
}]

test('Build a JSON Schema for a field with no dependencies.', () => {
  expect(createJsonSchemaForFieldType(fieldTypes[1], fieldTypes, [])).toEqual({
    title: 'Field Type "integer"',
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'number',
    definitions: {}
  })
})

test('Build a JSON Schema for a field with referenced field types.', () => {
  expect(createJsonSchemaForFieldType(fieldTypes[0], fieldTypes, [])).toEqual({
    title: 'Field Type "example"',
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties: {
      first: { $ref: '#/definitions/integer' },
      second: { $ref: '#/definitions/integer' }
    },
    required: ['first', 'second'],
    definitions: {
      integer: { type: 'number' }
    }
  })
})
