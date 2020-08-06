/* eslint-env jest */
const createJsonSchemaForMergePatch = require('./createJsonSchemaForMergePatch')

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
    propA: { type: 'string', isRequired: true, canUpdate: true, isArray: true },
    propB: { type: 'string', isRequired: true, canUpdate: false },
    propC: { type: 'string', isRequired: false, canUpdate: true },
    propD: { type: 'string', isRequired: false, canUpdate: false }
  }
})

test('The json schema for a merge patch can be created.', () => {
  const docType = createDocType()
  expect(createJsonSchemaForMergePatch(docType, testFieldTypes, [])).toEqual({
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Doc Type "candidate" Merge Patch',
    type: 'object',
    properties: {
      propA: { type: ['array', 'null'], items: { $ref: '#/definitions/string' } },
      propC: { oneOf: [{ type: 'null' }, { $ref: '#/definitions/string' }] }
    },
    required: [],
    definitions: {
      string: { type: 'string' }
    }
  })
})
