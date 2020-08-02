/* eslint-env jest */
const createJsonSchemaForDocTypeFieldNonArrayProperty = require('./createJsonSchemaForDocTypeFieldNonArrayProperty')

test('Create JSON schema for a doc type field non array property.', () => {
  expect(createJsonSchemaForDocTypeFieldNonArrayProperty('myFieldType', '#/components/schemas/')).toEqual({
    $ref: '#/components/schemas/myFieldType'
  })
})
