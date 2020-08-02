/* eslint-env jest */
const createJsonSchemaForDocTypeFilterParameters = require('./createJsonSchemaForDocTypeFilterParameters')

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
  filters: {
    bySomething: {
      parameters: {
        amount: { type: 'money', isRequired: true },
        event: { type: 'dateTimeUtc' }
      }
    }
  }
}

test('Build a JSON Schema for doc type filter parameters.', () => {
  expect(createJsonSchemaForDocTypeFilterParameters(docType, 'bySomething', fieldTypes)).toEqual({
    title: 'Doc Type "candidate" (Filter bySomething)',
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
