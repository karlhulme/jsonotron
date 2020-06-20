/* eslint-env jest */
const createJsonSchemaForFieldType = require('./createJsonSchemaForFieldType')
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
  expect(createJsonSchemaForFieldType(fieldTypes, 'integer')).toEqual({
    title: 'Integer JSON Schema',
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'number',
    definitions: {}
  })
})

test('Build a JSON Schema for a field with referenced field types.', () => {
  expect(createJsonSchemaForFieldType(fieldTypes, 'example')).toEqual({
    title: 'Example JSON Schema',
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

test('Build a JSON Schema for a field with referenced field types to be used as a fragment with external schemas.', () => {
  expect(createJsonSchemaForFieldType(fieldTypes, 'example', true, '#/components/schemas/')).toEqual({
    title: 'Example JSON Schema',
    type: 'object',
    properties: {
      first: { $ref: '#/components/schemas/integer' },
      second: { $ref: '#/components/schemas/integer' }
    },
    required: ['first', 'second']
  })
})

test('Fail to build a JSON Schema for an invalid field type.', () => {
  expect(() => createJsonSchemaForFieldType(fieldTypes, 'invalid')).toThrow(JsonotronFieldTypeResolutionError)
  expect(() => createJsonSchemaForFieldType(fieldTypes, 'invalid')).toThrow(/Field type 'invalid' cannot be resolved/)
})

test('Fail to build a JSON Schema for a type with an unresolved reference.', () => {
  expect(() => createJsonSchemaForFieldType(fieldTypes, 'film')).toThrow(JsonotronFieldTypeResolutionError)
  expect(() => createJsonSchemaForFieldType(fieldTypes, 'film')).toThrow(/Field type 'unresolved' cannot be resolved/)
})
