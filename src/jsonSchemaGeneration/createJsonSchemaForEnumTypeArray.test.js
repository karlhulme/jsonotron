/* eslint-env jest */
import { createJsonSchemaForEnumTypeArray } from './createJsonSchemaForEnumTypeArray'

function createValidEnumType () {
  return {
    name: 'candidateEnumType',
    type: 'enum',
    items: [
      { value: 'en', text: 'England', symbol: 'EN' },
      { value: 'us', text: 'United States', deprecated: false },
      { value: 'fr' }
    ]
  }
}

test('Produce a valid json schema from an enum type.', () => {
  const et = createValidEnumType()
  expect(createJsonSchemaForEnumTypeArray(et)).toEqual({
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Array of Enum Type "candidateEnumType"',
    type: 'array',
    items: {
      enum: ['en', 'us', 'fr']
    }
  })
})
