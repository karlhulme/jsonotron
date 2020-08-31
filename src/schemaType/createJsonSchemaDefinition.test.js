/* eslint-env jest */
import { createJsonSchemaDefinition } from './createJsonSchemaDefinition'

const enumTypes = [{
  name: 'choice',
  items: [
    { value: 'initial' },
    { value: 'final' }
  ]
}]

const schemaTypes = [{
  name: 'example',
  jsonSchema: definitionsPath => ({
    type: 'object',
    properties: {
      first: { $ref: `${definitionsPath}integer` },
      second: { $ref: `${definitionsPath}integer` },
      third: { $ref: `${definitionsPath}choice` }
    },
    required: ['first', 'second']
  }),
  referencedSchemaTypes: ['integer'],
  referencedEnumTypes: ['choice']
}, {
  name: 'integer',
  jsonSchema: {
    type: 'number'
  },
  referencedSchemaTypes: [],
  referencedEnumTypes: []
}]

test('Create the definition portion of a json schema for a set of referenced schema and enum types.', () => {
  expect(createJsonSchemaDefinition(['example'], [], schemaTypes, enumTypes)).toEqual({
    example: {
      type: 'object',
      properties: {
        first: { $ref: '#/definitions/integer' },
        second: { $ref: '#/definitions/integer' },
        third: { $ref: '#/definitions/choice' }
      },
      required: ['first', 'second']
    },
    integer: {
      type: 'number'
    },
    choice: {
      enum: ['initial', 'final']
    }
  })
})
