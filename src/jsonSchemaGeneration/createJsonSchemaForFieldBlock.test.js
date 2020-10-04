/* eslint-env jest */
import { createJsonSchemaForFieldBlock } from './createJsonSchemaForFieldBlock.js'

const testEnumTypes = [
  {
    name: 'trueFalse',
    items: [
      { value: true },
      { value: false }
    ]
  }
]

const testSchemaTypes = [
  {
    name: 'integer',
    jsonSchema: {
      type: 'integer'
    }
  }, {
    name: 'float',
    jsonSchema: {
      type: 'number'
    }
  }, {
    name: 'string',
    jsonSchema: {
      type: 'string'
    }
  }
]

const createFieldBlock = (isNullable) => ({
  name: 'candidateFieldBlock',
  fields: {
    propA: { type: 'integer', isRequired: true, isNullable },
    propB: { type: 'float', isNullable },
    propC: { type: 'integer', isRequired: true, isNullable },
    propE: { type: 'trueFalse', isNullable },
    propQ: { type: 'string', isArray: true, isNullable },
    propY: { type: 'string', const: 'hello', isNullable }
  }
})

test('A schema can be created for a field block.', () => {
  const fieldBlock = createFieldBlock(false)
  expect(createJsonSchemaForFieldBlock(fieldBlock, testSchemaTypes, testEnumTypes)).toEqual({
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'candidateFieldBlock',
    type: 'object',
    properties: {
      propA: { $ref: '#/definitions/integer' },
      propB: { $ref: '#/definitions/float' },
      propC: { $ref: '#/definitions/integer' },
      propE: { $ref: '#/definitions/trueFalse' },
      propQ: { type: 'array', items: { $ref: '#/definitions/string' } },
      propY: { enum: ['hello'] }
    },
    required: ['propA', 'propC'],
    definitions: {
      integer: { type: 'integer' },
      float: { type: 'number' },
      trueFalse: { enum: [true, false] },
      string: { type: 'string' }
    }
  })
})

test('A schema can be created for a nullable field block.', () => {
  const fieldBlock = createFieldBlock(true)
  expect(createJsonSchemaForFieldBlock(fieldBlock, testSchemaTypes, testEnumTypes)).toEqual({
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'candidateFieldBlock',
    type: 'object',
    properties: {
      propA: { oneOf: [{ type: 'null' }, { $ref: '#/definitions/integer' }] },
      propB: { oneOf: [{ type: 'null' }, { $ref: '#/definitions/float' }] },
      propC: { oneOf: [{ type: 'null' }, { $ref: '#/definitions/integer' }] },
      propE: { oneOf: [{ type: 'null' }, { $ref: '#/definitions/trueFalse' }] },
      propQ: { type: ['array', 'null'], items: { $ref: '#/definitions/string' } },
      propY: { enum: ['hello'] }
    },
    required: ['propA', 'propC'],
    definitions: {
      integer: { type: 'integer' },
      float: { type: 'number' },
      trueFalse: { enum: [true, false] },
      string: { type: 'string' }
    }
  })
})
