/* eslint-env jest */
const createJsonSchemaForDocTypeFunctionParameters = require('./createJsonSchemaForDocTypeFunctionParameters')

const fieldTypes = [{
  name: 'money',
  jsonSchema: { type: 'float' }
}, {
  name: 'integer',
  jsonSchema: { type: 'integer' }
}]

const docType = {
  name: 'map',
  fields: {
    cost: { type: 'money', isRequired: true },
    sizeInMetresSquares: { type: 'integer' },
    placesCount: { type: 'integer' },
    baseList: { type: 'integer', isArray: true }
  },
  filters: {
    bySize: {
      parameters: {
        cost: { type: 'money', isRequired: true },
        maxSize: { type: 'integer' },
        listOfNumbers: { type: 'integer', isArray: true },
        baseList: { type: 'integer', isArray: true }
      }
    }
  }
}

test('Build a JSON Schema for doc type function parameter.', () => {
  expect(createJsonSchemaForDocTypeFunctionParameters(docType, 'Filter bySize', docType.filters.bySize.parameters, fieldTypes)).toEqual({
    title: 'Doc Type "map" (Filter bySize)',
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    properties: {
      cost: { $ref: '#/definitions/money' },
      maxSize: { $ref: '#/definitions/integer' },
      listOfNumbers: { type: 'array', items: { $ref: '#/definitions/integer' } },
      baseList: { type: 'array', items: { $ref: '#/definitions/integer' } }
    },
    required: ['cost'],
    definitions: {
      integer: { type: 'integer' },
      money: { type: 'float' }
    }
  })
})

test('Build a JSON Schema for empty function parameter.', () => {
  expect(createJsonSchemaForDocTypeFunctionParameters(docType, 'Filter byNothing', {}, [])).toEqual({
    title: 'Doc Type "map" (Filter byNothing)',
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    properties: {},
    required: [],
    definitions: {}
  })
})
