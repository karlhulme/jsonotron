/* eslint-env jest */
const createJsonSchemaForConstructorParameters = require('./createJsonSchemaForConstructorParameters')

const testFieldTypes = [
  {
    name: 'string',
    type: 'field',
    jsonSchema: {
      type: 'string'
    }
  }
]

const createDocType = () => ({
  name: 'candidate',
  fields: {
    propA: { type: 'string', isRequired: true, canUpdate: true },
    propB: { type: 'string', isRequired: true, canUpdate: false },
    propC: { type: 'string', isRequired: false, canUpdate: true },
    propD: { type: 'string', isRequired: false, canUpdate: false }
  },
  ctor: {
    parameters: {
      propL: { type: 'string', isArray: true }
    }
  }
})

test('The json schema for the parameters of a constructor can be created.', () => {
  const docType = createDocType()
  expect(createJsonSchemaForConstructorParameters(docType, testFieldTypes, [])).toEqual({
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Doc Type "candidate" Constructor',
    type: 'object',
    properties: {
      propL: { type: 'array', items: { $ref: '#/definitions/string' } },
      propA: { $ref: '#/definitions/string' },
      propC: { $ref: '#/definitions/string' }
    },
    required: [],
    definitions: {
      string: { type: 'string' }
    }
  })
})
