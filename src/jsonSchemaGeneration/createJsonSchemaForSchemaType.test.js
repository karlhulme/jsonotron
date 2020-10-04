import { expect, test } from '@jest/globals'
import { createJsonSchemaForSchemaType } from './createJsonSchemaForSchemaType.js'

const schemaTypes = [{
  name: 'example',
  jsonSchema: {
    type: 'object',
    properties: {
      first: { $ref: '#/definitions/integer' },
      second: { $ref: '#/definitions/integer' }
    },
    required: ['first', 'second']
  }
}, {
  name: 'integer',
  jsonSchema: {
    type: 'number'
  }
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
