/* eslint-env jest */
import { createJsonSchemaForFieldBlock } from './createJsonSchemaForFieldBlock'

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

const createFieldBlock = () => ({
  propA: { type: 'integer', isRequired: true, canUpdate: true },
  propB: { type: 'float', default: 1.2 },
  propC: { type: 'integer', isGuaranteed: true },
  propE: { type: 'trueFalse' },
  propQ: { type: 'string', isArray: true },
  propY: { const: 'hello' }
})

test('A schema can be created for a field block.', () => {
  const fieldBlock = createFieldBlock()
  expect(createJsonSchemaForFieldBlock('test', fieldBlock, testSchemaTypes, testEnumTypes, false)).toEqual({
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'test',
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
  const fieldBlock = createFieldBlock()
  expect(createJsonSchemaForFieldBlock('test', fieldBlock, testSchemaTypes, testEnumTypes, true)).toEqual({
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'test',
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
