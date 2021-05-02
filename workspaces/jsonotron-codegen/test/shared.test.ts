import { expect, test } from '@jest/globals'
import { TypeLibrary } from 'jsonotron-interfaces'

test('Prevent warnings on shared.test about missing tests.', async () => {
  expect(1 + 1).toEqual(2)
})

export function createEmptyTypeLibrary (): TypeLibrary {
  return {
    jsonSchemaDomain: '',
    boolTypes: [],
    enumTypes: [],
    floatTypes: [],
    objectTypes: [],
    intTypes: [],
    recordTypes: [],
    stringTypes: []
  }
}
