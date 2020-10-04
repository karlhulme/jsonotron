/* eslint-env jest */
import { patchFieldBlockDefinition } from './patchFieldBlockDefinition.js'

function createMinimalFieldBlock () {
  return {
    name: 'candidateFieldBlock',
    fields: {
      fieldA: { type: 'string' }
    }
  }
}

test('A minimal field block type is patched.', () => {
  const candidate = createMinimalFieldBlock()
  const patchedCandidate = patchFieldBlockDefinition(candidate)
  expect(patchedCandidate.fields.fieldA).toEqual({ type: 'string', isRequired: false, isNullable: false, isArray: false })
})

test('A patched object should not change if re-patched.', () => {
  // this exercises the branch where the field block is fully populated
  const candidate = createMinimalFieldBlock()
  const patchedCandidate = patchFieldBlockDefinition(candidate)
  expect(patchFieldBlockDefinition(patchedCandidate)).toEqual(patchedCandidate)
})
