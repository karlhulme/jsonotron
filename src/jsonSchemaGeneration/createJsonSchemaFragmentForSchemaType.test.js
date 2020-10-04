import { expect, test } from '@jest/globals'
import { createJsonSchemaFragmentForSchemaType } from './createJsonSchemaFragmentForSchemaType.js'

const schemaType = {
  name: 'schemaType',
  jsonSchema: {
    type: 'string'
  }
}

test('Create json schema fragment of a schema type.', () => {
  expect(createJsonSchemaFragmentForSchemaType(schemaType)).toEqual({ type: 'string' })
})
