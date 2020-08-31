/* eslint-env jest */
import { createJsonSchemaForEnumType } from './createJsonSchemaForEnumType'

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
  expect(createJsonSchemaForEnumType(et)).toEqual({
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Enum Type "candidateEnumType"',
    enum: ['en', 'us', 'fr']
  })
})
