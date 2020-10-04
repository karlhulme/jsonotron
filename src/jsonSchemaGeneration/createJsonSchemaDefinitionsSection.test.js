import { expect, test } from '@jest/globals'
import { createJsonSchemaDefinitionsSection } from './createJsonSchemaDefinitionsSection.js'

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
  }
}, {
  name: 'integer',
  jsonSchema: {
    type: 'number'
  }
}]

test('Create the definition portion of a json schema for a set of referenced schema and enum types.', () => {
  expect(createJsonSchemaDefinitionsSection(['example'], schemaTypes, enumTypes)).toEqual({
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
