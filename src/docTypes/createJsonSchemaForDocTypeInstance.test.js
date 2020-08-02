/* eslint-env jest */
const createJsonSchemaForDocTypeInstance = require('./createJsonSchemaForDocTypeInstance')

const fieldTypes = [{
  name: 'money',
  jsonSchema: { type: 'float' }
}, {
  name: 'integer',
  jsonSchema: { type: 'integer' }
}, {
  name: 'sysDateTime',
  jsonSchema: { type: 'string' }
}, {
  name: 'sysId',
  jsonSchema: { type: 'string' }
}, {
  name: 'sysUserIdentity',
  jsonSchema: { type: 'string' }
}, {
  name: 'sysVersion',
  jsonSchema: { type: 'string' }
}, {
  name: 'sysOpId',
  jsonSchema: { type: 'string' }
}]

const docType = {
  name: 'map',
  fields: {
    cost: { type: 'money', isRequired: true },
    sizeInMetresSquares: { type: 'integer' },
    placesCount: { type: 'integer' },
    list: { type: 'integer', isArray: true }
  }
}

test('Build a JSON Schema for doc type fields.', () => {
  expect(createJsonSchemaForDocTypeInstance(docType, fieldTypes, true)).toEqual({
    title: 'Doc Type "map" +sys',
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: true,
    properties: {
      id: { $ref: '#/definitions/sysId' },
      docType: { enum: ['map'] },
      docVersion: {},
      sys: {
        type: 'object',
        properties: {
          origin: {
            type: 'object',
            additionalProperties: false,
            properties: {
              style: { enum: ['new', 'replace'] },
              userIdentity: { $ref: '#/definitions/sysUserIdentity' },
              dateTime: { $ref: '#/definitions/sysDateTime' }
            },
            required: ['style', 'userIdentity', 'dateTime']
          },
          updated: {
            type: 'object',
            additionalProperties: false,
            properties: {
              userIdentity: { $ref: '#/definitions/sysUserIdentity' },
              dateTime: { $ref: '#/definitions/sysDateTime' }
            },
            required: ['userIdentity', 'dateTime']
          },
          ops: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                opId: { $ref: '#/definitions/sysOpId' },
                userIdentity: { $ref: '#/definitions/sysUserIdentity' },
                dateTime: { $ref: '#/definitions/sysDateTime' },
                style: { enum: ['patch', 'operation'] },
                operationName: { type: 'string' }
              },
              additionalProperties: false,
              required: ['opId', 'userIdentity', 'dateTime', 'style']
            }
          },
          calcs: {
            type: 'object',
            additionalProperties: {
              type: 'object',
              additionalProperties: false,
              properties: {
                value: {}
              }
            }
          }
        },
        required: ['ops', 'calcs']
      },
      cost: { $ref: '#/definitions/money' },
      sizeInMetresSquares: { $ref: '#/definitions/integer' },
      placesCount: { $ref: '#/definitions/integer' },
      list: { type: 'array', items: { $ref: '#/definitions/integer' } }
    },
    required: ['id', 'docType', 'sys', 'cost'],
    definitions: {
      sysDateTime: { type: 'string' },
      sysId: { type: 'string' },
      sysUserIdentity: { type: 'string' },
      sysVersion: { type: 'string' },
      sysOpId: { type: 'string' },
      integer: { type: 'integer' },
      money: { type: 'float' }
    }
  })
})

test('Build a JSON Schema for doc types without the sys field.', () => {
  expect(createJsonSchemaForDocTypeInstance(docType, fieldTypes)).toEqual({
    title: 'Doc Type "map"',
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: true,
    properties: {
      id: { $ref: '#/definitions/sysId' },
      docType: { enum: ['map'] },
      docVersion: {},
      cost: { $ref: '#/definitions/money' },
      sizeInMetresSquares: { $ref: '#/definitions/integer' },
      placesCount: { $ref: '#/definitions/integer' },
      list: { type: 'array', items: { $ref: '#/definitions/integer' } }
    },
    required: ['id', 'docType', 'cost'],
    definitions: {
      sysId: { type: 'string' },
      integer: { type: 'integer' },
      money: { type: 'float' }
    }
  })
})
