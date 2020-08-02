/* eslint-env jest */
const createJsonSchemaForDocTypeFieldArrayProperty = require('./createJsonSchemaForDocTypeFieldArrayProperty')

test('Create JSON schema for a doc type field array property.', () => {
  expect(createJsonSchemaForDocTypeFieldArrayProperty('myFieldType', '#/components/schemas/')).toEqual({
    type: 'array',
    items: { $ref: '#/components/schemas/myFieldType' }
  })
})
