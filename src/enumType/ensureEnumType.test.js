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
      { value: 'en', paragraphs: ['England'], symbol: 'EN' },
      { value: 'us', paragraphs: ['United States'], isDeprecated: false },
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
  expect(et.items[0]).toEqual({ value: 'en', paragraphs: ['England'], symbol: 'EN', isDeprecated: false })
  expect(et.items[1]).toEqual({ value: 'us', paragraphs: ['United States'], symbol: '', isDeprecated: false })
  expect(et.items[2]).toEqual({ value: 'fr', paragraphs: ['Fr'], symbol: '', isDeprecated: false })
})

test('Minimal enum type can be verified.', () => {
  const ajv = createCustomisedAjv()
  const et = createMinimalEnumType()
  expect(() => ensureEnumType(ajv, et)).not.toThrow()
  expect(et.type).toEqual('enum')
  expect(et.title).toEqual('Minimal Enum Type')
  expect(et.paragraphs).toEqual([])
  expect(et.items.length).toEqual(1)
  expect(et.items[0]).toEqual({ value: 'albatross', paragraphs: ['Albatross'], symbol: '', isDeprecated: false })
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
