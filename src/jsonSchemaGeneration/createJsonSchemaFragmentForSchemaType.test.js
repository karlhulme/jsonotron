/* eslint-env jest */
import { createJsonSchemaFragmentForSchemaType } from './createJsonSchemaFragmentForSchemaType'

const schemaType = {
  name: 'schemaType',
  jsonSchema: {
    type: 'string'
  }
}

test('Create json schema fragment of a schema type.', () => {
  expect(createJsonSchemaFragmentForSchemaType(schemaType)).toEqual({ type: 'string' })
})