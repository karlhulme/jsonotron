/* eslint-env jest */
const { JsonotronUnrecognisedOperationNameError } = require('jsonotron-errors')
const createJsonSchemaForOperationParameters = require('./createJsonSchemaForOperationParameters')

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
  operations: {
    doSomething: {
      parameters: {
        propA: { type: 'string' }
      }
    }
  }
})

test('The json schema for the parameters of an operation can be created.', () => {
  const docType = createDocType()
  expect(createJsonSchemaForOperationParameters(docType, 'doSomething', testFieldTypes, [])).toEqual({
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Doc Type "candidate" Operation "doSomething"',
    type: 'object',
    properties: {
      propA: { $ref: '#/definitions/string' }
    },
    required: [],
    definitions: {
      string: { type: 'string' }
    }
  })
})

test('The json schema for the parameters of an unknown operation cannot be created.', () => {
  const docType = createDocType()
  expect(() => createJsonSchemaForOperationParameters(docType, 'madeup', testFieldTypes, [])).toThrow(JsonotronUnrecognisedOperationNameError)
  expect(() => createJsonSchemaForOperationParameters(docType, 'madeup', testFieldTypes, [])).toThrow(/madeup/)
})
