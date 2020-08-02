/* eslint-env jest */
const createJsonSchemaForDocTypeOperationParameters = require('./createJsonSchemaForDocTypeOperationParameters')

const fieldTypes = [{
  name: 'money',
  jsonSchema: { type: 'float' }
}, {
  name: 'dateTimeUtc',
  jsonSchema: { type: 'string' }
}]

const docType = {
  name: 'candidate',
  fields: {},
  operations: {
    doSomething: {
      parameters: {
        amount: { type: 'money', isRequired: true },
        event: { type: 'dateTimeUtc' }
      }
    }
  }
}

test('Build a JSON Schema for doc type operation parameters.', () => {
  expect(createJsonSchemaForDocTypeOperationParameters(docType, 'doSomething', fieldTypes)).toEqual({
    title: 'Doc Type "candidate" (Operation doSomething)',
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: false,
    properties: {
      amount: { $ref: '#/definitions/money' },
      event: { $ref: '#/definitions/dateTimeUtc' }
    },
    required: ['amount'],
    definitions: {
      dateTimeUtc: { type: 'string' },
      money: { type: 'float' }
    }
  })
})
