/* eslint-env jest */
import { patchFieldBlockType } from './patchFieldBlockType'

function createMinimalFieldBlock () {
  return {
    name: 'candidateFieldBlock',
    fields: {
      fieldA: { type: 'string' }
    }
  }
}

function createMinimalFieldBlockWithExample () {
  return {
    name: 'candidateFieldBlock',
    fields: {
      fieldA: { type: 'string' }
    },
    examples: [
      { value: 'foo' },
      { value: 'bar', paragraphs: ['An example.'] }
    ]
  }
}

test('A minimal field block type is patched.', () => {
  const candidate = createMinimalFieldBlock()
  const patchedCandidate = patchFieldBlockType(candidate)
  expect(patchedCandidate.fields.fieldA).toEqual({ type: 'string', isRequired: false, isNullable: false, isArray: false, flags: {}, paragraphs: [] })
  expect(patchedCandidate.examples).toEqual([])
})

test('A minimal field block type with example is patched.', () => {
  const candidate = createMinimalFieldBlockWithExample()
  const patchedCandidate = patchFieldBlockType(candidate)
  expect(patchedCandidate.examples[0]).toEqual({ value: 'foo', paragraphs: [] })
})

test('A patched object should not change if re-patched.', () => {
  // this exercises the branch where the field block is fully populated
  const candidate = createMinimalFieldBlock()
  const patchedCandidate = patchFieldBlockType(candidate)
  expect(patchFieldBlockType(patchedCandidate)).toEqual(patchedCandidate)
})
