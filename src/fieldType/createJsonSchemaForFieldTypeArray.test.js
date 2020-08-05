/* eslint-env jest */
const createJsonSchemaForFieldTypeArray = require('./createJsonSchemaForFieldTypeArray')

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
  expect(createJsonSchemaForFieldTypeArray(fieldTypes[1], fieldTypes, [])).toEqual({
    title: 'Array of Field Type "integer"',
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'array',
    items: {
      type: 'number'
    },
    definitions: {}
  })
})

test('Build a JSON Schema for a field with referenced field types.', () => {
  expect(createJsonSchemaForFieldTypeArray(fieldTypes[0], fieldTypes, [])).toEqual({
    title: 'Array of Field Type "example"',
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        first: { $ref: '#/definitions/integer' },
        second: { $ref: '#/definitions/integer' }
      },
      required: ['first', 'second']
    },
    definitions: {
      integer: { type: 'number' }
    }
  })
})
