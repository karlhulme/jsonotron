/* eslint-env jest */
import { createJsonSchemaDefinitionsSection } from './createJsonSchemaDefinitionsSection'

const enumTypes = [{
  name: 'choice',
  items: [
    { value: 'initial' },
    { value: 'final' }
  ]
}]

const schemaTypes = [{
  name: 'example',
  jsonSchema: {
    type: 'object',
    properties: {
      first: { $ref: '#/definitions/integer' },
      second: { $ref: '#/definitions/integer' },
      third: { $ref: '#/definitions/choice' }
    },
    required: ['first', 'second']
  },
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
  expect(createJsonSchemaDefinitionsSection(['example'], [], schemaTypes, enumTypes)).toEqual({
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
