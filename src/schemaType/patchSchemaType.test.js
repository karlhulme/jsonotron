/* eslint-env jest */
import { patchSchemaType } from './patchSchemaType'

function createMinimalSchemaType () {
  return {
    name: 'candidateSchemaType',
    jsonSchema: {
      type: 'string'
    }
  }
}

function createMinimalSchemaTypeWithExample () {
  return {
    name: 'candidateSchemaType',
    examples: [
      { value: 'a' }
    ],
    jsonSchema: {
      type: 'string'
    }
  }
}

test('A minimal schema type is patched.', () => {
  const candidate = createMinimalSchemaType()
  const patchedCandidate = patchSchemaType(candidate)
  expect(patchedCandidate.title).toEqual('Candidate Schema Type')
  expect(patchedCandidate.paragraphs).toEqual([''])
  expect(patchedCandidate.validTestCases).toEqual([])
  expect(patchedCandidate.invalidTestCases).toEqual([])
  expect(patchedCandidate.referencedSchemaTypes).toEqual([])
  expect(patchedCandidate.referencedEnumTypes).toEqual([])
})

test('A minimal schema type with example is patched.', () => {
  const candidate = createMinimalSchemaTypeWithExample()
  const patchedCandidate = patchSchemaType(candidate)
  expect(patchedCandidate.examples).toEqual([{ value: 'a', paragraphs: [''] }])
})

test('A patched object should not change if re-patched.', () => {
  // this exercises the branch where the schema type is fully populated
  const candidate = createMinimalSchemaTypeWithExample()
  const patchedCandidated = patchSchemaType(candidate)
  expect(patchSchemaType(patchedCandidated)).toEqual(patchedCandidated)
})
