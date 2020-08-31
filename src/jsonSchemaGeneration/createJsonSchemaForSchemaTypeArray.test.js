/* eslint-env jest */
import { createJsonSchemaForSchemaTypeArray } from './createJsonSchemaForSchemaTypeArray'

const schemaTypes = [{
  name: 'example',
  jsonSchema: {
    type: 'object',
    properties: {
      first: { $ref: '#/definitions/integer' },
      second: { $ref: '#/definitions/integer' }
    },
    required: ['first', 'second']
  },
  referencedSchemaTypes: ['integer'],
  referencedEnumTypes: []
}, {
  name: 'integer',
  jsonSchema: {
    type: 'number'
  },
  referencedSchemaTypes: [],
  referencedEnumTypes: []
}]

test('Build a JSON Schema for a schema with no dependencies.', () => {
  expect(createJsonSchemaForSchemaTypeArray(schemaTypes[1], schemaTypes, [])).toEqual({
    title: 'Array of Schema Type "integer"',
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'array',
    items: {
      type: 'number'
    },
    definitions: {}
  })
})

test('Build a JSON Schema for a schema with referenced schema types.', () => {
  expect(createJsonSchemaForSchemaTypeArray(schemaTypes[0], schemaTypes, [])).toEqual({
    title: 'Array of Schema Type "example"',
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
