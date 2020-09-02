/* eslint-env jest */
import { patchEnumType } from './patchEnumType'

function createMinimalEnumType () {
  return {
    name: 'candidateEnumType',
    items: [
      { value: 'en' }
    ]
  }
}

test('A minimal enum type is patched.', () => {
  const candidate = createMinimalEnumType()
  const patchedCandidate = patchEnumType(candidate)
  expect(patchedCandidate.title).toEqual('Candidate Enum Type')
  expect(patchedCandidate.paragraphs).toEqual([''])
  expect(patchedCandidate.items[0]).toEqual({ value: 'en', symbol: '', isDeprecated: false, paragraphs: [] })
})

test('A patched object should not change if re-patched.', () => {
  // this exercises the branch where the enum type is fully populated
  const candidate = createMinimalEnumType()
  const patchedCandidate = patchEnumType(candidate)
  expect(patchEnumType(patchedCandidate)).toEqual(patchedCandidate)
})
