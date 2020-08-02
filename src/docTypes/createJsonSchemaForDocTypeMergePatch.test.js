/* eslint-env jest */
const createJsonSchemaForDocTypeMergePatch = require('./createJsonSchemaForDocTypeMergePatch')

const fieldTypes = [{
  name: 'money',
  jsonSchema: { type: 'float' }
}, {
  name: 'integer',
  jsonSchema: { type: 'integer' }
}, {
  name: 'string',
  jsonSchema: { type: 'string' }
}]

const docType = {
  name: 'map',
  title: 'Map',
  fields: {
    cost: { type: 'money', isRequired: true, canUpdate: true },
    sizeInMetresSquares: { type: 'integer' },
    placesCount: { type: 'integer' },
    list: { type: 'integer', isArray: true },
    vendors: { type: 'string', isArray: true, canUpdate: true }
  }
}

test('Build an Update JSON Schema for doc type fields.', () => {
  expect(createJsonSchemaForDocTypeMergePatch(docType, fieldTypes)).toEqual({
    title: 'Map "Merge Patch" JSON Schema',
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    properties: {
      cost: { $ref: '#/definitions/money' },
      vendors: {
        type: 'array',
        items: { $ref: '#/definitions/string' }
      }
    },
    definitions: {
      money: { type: 'float' },
      string: { type: 'string' }
    }
  })
})

test('Build an Update JSON Schema for doc type fields to be used as a fragment with external schemas.', () => {
  expect(createJsonSchemaForDocTypeMergePatch(docType, fieldTypes, true, '#/components/schemas/')).toEqual({
    title: 'Map "Merge Patch" JSON Schema',
    type: 'object',
    additionalProperties: false,
    properties: {
      cost: { $ref: '#/components/schemas/money' },
      vendors: {
        type: 'array',
        items: { $ref: '#/components/schemas/string' }
      }
    }
  })
})
