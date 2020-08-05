/* eslint-env jest */
const createJsonSchemaDefinition = require('./createJsonSchemaDefinition')

const enumTypes = [{
  name: 'choice',
  items: [
    { value: 'initial' },
    { value: 'final' }
  ]
}]

const fieldTypes = [{
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
  referencedFieldTypes: ['integer'],
  referencedEnumTypes: ['choice']
}, {
  name: 'integer',
  jsonSchema: {
    type: 'number'
  },
  referencedFieldTypes: [],
  referencedEnumTypes: []
}]

test('Create the definition portion of a json schema for a set of referenced field and enum types.', () => {
  expect(createJsonSchemaDefinition(['example'], [], fieldTypes, enumTypes)).toEqual({
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
