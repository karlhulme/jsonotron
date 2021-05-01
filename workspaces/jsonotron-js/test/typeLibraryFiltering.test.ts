import { expect, test } from '@jest/globals'
import { TypeLibrary } from 'jsonotron-interfaces'
import { filterTypeLibrary } from '../src/parsing'

const typeLibrary: TypeLibrary = {
  jsonSchemaDomain: 'aaa',
  boolTypes: [],
  enumTypes: [],
  floatTypes: [],
  intTypes: [],
  objectTypes: [],
  recordTypes: [],
  stringTypes: [{
    kind: 'string',
    system: 'test',
    name: 'stringType1',
    summary: '',
    maximumLength: 5,
    examples: [],
    jsonSchema: {}
  }, {
    kind: 'string',
    system: 'test2',
    name: 'stringType2',
    summary: '',
    maximumLength: 5,
    examples: [],
    jsonSchema: {}
  }]
}

test('A type library can be filtered.', async () => {
  expect(typeLibrary.stringTypes).toHaveLength(2)

  const filteredTypeLibrary = filterTypeLibrary(typeLibrary, ['test'])

  expect(filteredTypeLibrary.stringTypes).toHaveLength(1)
})
