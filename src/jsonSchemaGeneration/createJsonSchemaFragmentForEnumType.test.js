import { expect, test } from '@jest/globals'
import { createJsonSchemaFragmentForEnumType } from './createJsonSchemaFragmentForEnumType.js'

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

test('Produce a valid json schema fragment from an enum type.', () => {
  const et = createValidEnumType()
  expect(createJsonSchemaFragmentForEnumType(et)).toEqual({ enum: ['en', 'us', 'fr'] })
})
