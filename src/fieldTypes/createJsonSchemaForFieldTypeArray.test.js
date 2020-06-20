/* eslint-env jest */
const createJsonSchemaForFieldTypeArray = require('./createJsonSchemaForFieldTypeArray')
const { JsonotronFieldTypeResolutionError } = require('jsonotron-errors')

const fieldTypes = [{
  name: 'example',
  title: 'Example',
  jsonSchema: definitionsPath => ({
    type: 'object',
    properties: {
      first: { $ref: `${definitionsPath}integer` },
      second: { $ref: `${definitionsPath}integer` }
    },
    required: ['first', 'second']
  }),
  referencedFieldTypes: ['integer']
}, {
  name: 'integer',
  title: 'Integer',
  jsonSchema: {
    type: 'number'
  }
}, {
  name: 'film',
  title: 'Film',
  jsonSchema: {
    type: 'object',
    properties: {
      star: { $ref: '#/definitions/unresolved' }
    }
  },
  referencedFieldTypes: ['unresolved']
}]

test('Build a JSON Schema for a field with no dependencies.', () => {
  expect(createJsonSchemaForFieldTypeArray(fieldTypes, 'integer')).toEqual({
    title: 'Integer Array JSON Schema',
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'array',
    items: {
      type: 'number'
    },
    definitions: {}
  })
})

test('Build a JSON Schema for a field with referenced field types.', () => {
  expect(createJsonSchemaForFieldTypeArray(fieldTypes, 'example')).toEqual({
    title: 'Example Array JSON Schema',
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

test('Build a JSON Schema for a field with referenced field types to be used as a fragment with external schemas.', () => {
  expect(createJsonSchemaForFieldTypeArray(fieldTypes, 'example', true, '#/components/schemas/')).toEqual({
    title: 'Example Array JSON Schema',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        first: { $ref: '#/components/schemas/integer' },
        second: { $ref: '#/components/schemas/integer' }
      },
      required: ['first', 'second']
    }
  })
})

test('Fail to build an array JSON Schema for an invalid field type.', () => {
  expect(() => createJsonSchemaForFieldTypeArray(fieldTypes, 'invalid')).toThrow(JsonotronFieldTypeResolutionError)
  expect(() => createJsonSchemaForFieldTypeArray(fieldTypes, 'invalid')).toThrow(/Field type 'invalid' cannot be resolved/)
})

test('Fail to build an array JSON Schema for a type with an unresolved reference.', () => {
  expect(() => createJsonSchemaForFieldTypeArray(fieldTypes, 'film')).toThrow(JsonotronFieldTypeResolutionError)
  expect(() => createJsonSchemaForFieldTypeArray(fieldTypes, 'film')).toThrow(/Field type 'unresolved' cannot be resolved/)
})
