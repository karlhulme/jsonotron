/* eslint-env jest */
const { JsonotronUnrecognisedFilterNameError } = require('jsonotron-errors')
const createJsonSchemaForFilterParameters = require('./createJsonSchemaForFilterParameters')

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
  filters: {
    bySomething: {
      parameters: {
        propD: { type: 'string', isRequired: true }
      }
    }
  }
})

test('The json schema for the parameters of a filter can be created.', () => {
  const docType = createDocType()
  expect(createJsonSchemaForFilterParameters(docType, 'bySomething', testFieldTypes, [])).toEqual({
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Doc Type "candidate" Filter "bySomething"',
    type: 'object',
    properties: {
      propD: { $ref: '#/definitions/string' }
    },
    required: ['propD'],
    definitions: {
      string: { type: 'string' }
    }
  })
})

test('The json schema for the parameters of an unknown filter cannot be created.', () => {
  const docType = createDocType()
  expect(() => createJsonSchemaForFilterParameters(docType, 'madeup', testFieldTypes, [])).toThrow(JsonotronUnrecognisedFilterNameError)
  expect(() => createJsonSchemaForFilterParameters(docType, 'madeup', testFieldTypes, [])).toThrow(/madeup/)
})
