/* eslint-env jest */
const createJsonSchemaForFieldBlock = require('./createJsonSchemaForFieldBlock')

const testEnumTypes = [
  {
    name: 'trueFalse',
    type: 'enum',
    items: [
      { value: true },
      { value: false }
    ]
  }
]

const testFieldTypes = [
  {
    name: 'integer',
    type: 'field',
    jsonSchema: {
      type: 'integer'
    }
  }, {
    name: 'float',
    type: 'field',
    jsonSchema: {
      type: 'number'
    }
  }, {
    name: 'string',
    type: 'field',
    jsonSchema: {
      type: 'string'
    }
  }
]

const createFieldBlock = () => ({
  propA: { type: 'integer', isRequired: true, canUpdate: true },
  propB: { type: 'float', default: 1.2 },
  propE: { type: 'trueFalse' },
  propQ: { type: 'string', isArray: true },
  propY: { const: 'hello' }
})

test('A schema can be created for a field block.', () => {
  const fieldBlock = createFieldBlock()
  expect(createJsonSchemaForFieldBlock('test', fieldBlock, testFieldTypes, testEnumTypes, false)).toEqual({
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'test',
    type: 'object',
    properties: {
      propA: { $ref: '#/definitions/integer' },
      propB: { $ref: '#/definitions/float' },
      propE: { $ref: '#/definitions/trueFalse' },
      propQ: { type: 'array', items: { $ref: '#/definitions/string' } },
      propY: { enum: ['hello'] }
    },
    required: ['propA'],
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
  expect(createJsonSchemaForFieldBlock('test', fieldBlock, testFieldTypes, testEnumTypes, true)).toEqual({
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'test',
    type: 'object',
    properties: {
      propA: { oneOf: [{ type: 'null' }, { $ref: '#/definitions/integer' }] },
      propB: { oneOf: [{ type: 'null' }, { $ref: '#/definitions/float' }] },
      propE: { oneOf: [{ type: 'null' }, { $ref: '#/definitions/trueFalse' }] },
      propQ: { type: ['array', 'null'], items: { $ref: '#/definitions/string' } },
      propY: { enum: ['hello'] }
    },
    required: ['propA'],
    definitions: {
      integer: { type: 'integer' },
      float: { type: 'number' },
      trueFalse: { enum: [true, false] },
      string: { type: 'string' }
    }
  })
})
