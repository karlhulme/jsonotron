/* eslint-env jest */
import { createJsonSchemaForSchemaType } from './createJsonSchemaForSchemaType'

const schemaTypes = [{
  name: 'example',
  jsonSchema: definitionsPath => ({
    type: 'object',
    properties: {
      first: { $ref: `${definitionsPath}integer` },
      second: { $ref: `${definitionsPath}integer` }
    },
    required: ['first', 'second']
  }),
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
  expect(createJsonSchemaForSchemaType(schemaTypes[1], schemaTypes, [])).toEqual({
    title: 'Schema Type "integer"',
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'number',
    definitions: {}
  })
})

test('Build a JSON Schema for a schema with referenced schema types.', () => {
  expect(createJsonSchemaForSchemaType(schemaTypes[0], schemaTypes, [])).toEqual({
    title: 'Schema Type "example"',
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
