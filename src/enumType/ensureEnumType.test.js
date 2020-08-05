/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const { JsonotronEnumTypeValidationError } = require('jsonotron-errors')
const ensureEnumType = require('./ensureEnumType')

function createValidEnumType () {
  return {
    name: 'candidateEnumType',
    type: 'enum',
    title: 'Candidate Enum Type Here',
    paragraphs: ['A description of the enuum', 'appears here.'],
    items: [
      { value: 'en', text: 'England', symbol: 'EN' },
      { value: 'us', text: 'United States', deprecated: false },
      { value: 'fr' }
    ]
  }
}

function createMinimalEnumType () {
  return {
    name: 'minimalEnumType',
    items: [
      { value: 'albatross' }
    ]
  }
}

test('Valid enum type can be verified.', () => {
  const ajv = createCustomisedAjv()
  const et = createValidEnumType()
  expect(() => ensureEnumType(ajv, et)).not.toThrow()
  expect(et.title).toEqual('Candidate Enum Type Here')
  expect(et.items.length).toEqual(3)
  expect(et.items[0]).toEqual({ value: 'en', text: 'England', symbol: 'EN', deprecated: false })
  expect(et.items[1]).toEqual({ value: 'us', text: 'United States', symbol: '', deprecated: false })
  expect(et.items[2]).toEqual({ value: 'fr', text: 'Fr', symbol: '', deprecated: false })
})

test('Minimal enum type can be verified.', () => {
  const ajv = createCustomisedAjv()
  const et = createMinimalEnumType()
  expect(() => ensureEnumType(ajv, et)).not.toThrow()
  expect(et.type).toEqual('enum')
  expect(et.title).toEqual('Minimal Enum Type')
  expect(et.paragraphs).toEqual([])
  expect(et.items.length).toEqual(1)
  expect(et.items[0]).toEqual({ value: 'albatross', text: 'Albatross', symbol: '', deprecated: false })
})

test('Enum type with invalid name fails verification.', () => {
  const ajv = createCustomisedAjv()
  const et = createValidEnumType()
  et.name = '%invalid%'
  expect(() => ensureEnumType(ajv, et)).toThrow(JsonotronEnumTypeValidationError)
  expect(() => ensureEnumType(ajv, et)).toThrow(/name/)
})

test('Enum type with duplicate value fails verification.', () => {
  const ajv = createCustomisedAjv()
  const et = createValidEnumType()
  et.items.push({ value: 'en' })
  expect(() => ensureEnumType(ajv, et)).toThrow(JsonotronEnumTypeValidationError)
  expect(() => ensureEnumType(ajv, et)).toThrow(/Value 'en' is not unique/)
})
