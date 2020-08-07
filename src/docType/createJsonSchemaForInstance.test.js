/* eslint-env jest */
const createJsonSchemaForInstance = require('./createJsonSchemaForInstance')

const testFieldTypes = [
  {
    name: 'string',
    type: 'field',
    jsonSchema: {
      type: 'string'
    }
  }, {
    name: 'sysId',
    type: 'field',
    jsonSchema: {
      type: 'string'
    }
  }, {
    name: 'sysDocVersion',
    type: 'field',
    jsonSchema: {
      type: 'string'
    }
  }, {
    name: 'sysDocHeader',
    type: 'field',
    jsonSchema: {
      type: 'string'
    }
  }
]

const createDocType = () => ({
  name: 'candidate',
  fields: {
    propA: { type: 'string', isRequired: true, canUpdate: true, isArray: true },
    propB: { type: 'string', isRequired: true, canUpdate: false },
    propC: { type: 'string', isRequired: false, canUpdate: true },
    propD: { type: 'string', isRequired: false, canUpdate: false }
  }
})

test('The json schema for an instance can be created.', () => {
  const docType = createDocType()
  expect(createJsonSchemaForInstance(docType, testFieldTypes, [])).toEqual({
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Doc Type "candidate"',
    type: 'object',
    properties: {
      propA: { type: 'array', items: { $ref: '#/definitions/string' } },
      propB: { $ref: '#/definitions/string' },
      propC: { $ref: '#/definitions/string' },
      propD: { $ref: '#/definitions/string' }
    },
    required: ['propA', 'propB'],
    definitions: {
      string: { type: 'string' }
    }
  })
})

test('The json schema for an instance, including system header fields, can be created.', () => {
  const docType = createDocType()
  expect(createJsonSchemaForInstance(docType, testFieldTypes, [], true)).toEqual({
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Doc Type "candidate"',
    type: 'object',
    properties: {
      id: { $ref: '#/definitions/sysId' },
      docType: { enum: ['candidate'] },
      docVersion: { $ref: '#/definitions/sysDocVersion' },
      docHeader: { $ref: '#/definitions/sysDocHeader' },
      propA: { type: 'array', items: { $ref: '#/definitions/string' } },
      propB: { $ref: '#/definitions/string' },
      propC: { $ref: '#/definitions/string' },
      propD: { $ref: '#/definitions/string' }
    },
    required: ['id', 'docType', 'docHeader', 'propA', 'propB'],
    definitions: {
      string: { type: 'string' },
      sysId: { type: 'string' },
      sysDocVersion: { type: 'string' },
      sysDocHeader: { type: 'string' }
    }
  })
})
