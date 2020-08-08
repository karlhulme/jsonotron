/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const { JsonotronFieldTypesDocumentationMissingError, JsonotronFieldTypeValidationError } = require('jsonotron-errors')
const ensureFieldTypes = require('./ensureFieldTypes')

function createMinimalFieldType () {
  return {
    name: 'minimalFieldType',
    jsonSchema: {
      type: 'number',
      exclusiveMinimum: 0
    }
  }
}

function createValidFieldType () {
  return {
    name: 'candidateFieldType',
    type: 'field',
    title: 'Candidate',
    category: 'candidate',
    paragraphs: ['this is a', 'test field type'],
    examples: [
      { value: 123, paragraphs: ['numbers 1 to 3'] }
    ],
    validTestCases: [4, 5, 6],
    invalidTestCases: ['a string', '', null, true, {}, [], -34.56, -1, 0],
    jsonSchema: {
      type: 'number',
      exclusiveMinimum: 0
    },
    referencedFieldTypes: [],
    referencedEnumTypes: []
  }
}

test('Minimal field type can be verified.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createMinimalFieldType()
  expect(() => ensureFieldTypes(ajv, [candidate], [])).not.toThrow()
  expect(candidate.type).toEqual('field')
  expect(candidate.title).toEqual('Minimal Field Type')
  expect(candidate.category).toEqual('')
  expect(candidate.paragraphs).toEqual([])
  expect(candidate.examples).toEqual([])
  expect(candidate.validTestCases).toEqual([])
  expect(candidate.invalidTestCases).toEqual([])
  expect(candidate.referencedFieldTypes).toEqual([])
})

test('Minimal field type yields documentation errors.', () => {
  const ajv = createCustomisedAjv()
  const ft1 = createMinimalFieldType()
  expect(() => ensureFieldTypes(ajv, [ft1], [], true)).toThrow(JsonotronFieldTypesDocumentationMissingError)
  const ft2 = createMinimalFieldType()
  expect(() => ensureFieldTypes(ajv, [ft2], [], true)).toThrow(/minimalFieldType/)
})

test('Valid field type can be verified.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldType()
  expect(() => ensureFieldTypes(ajv, [candidate], [])).not.toThrow()
  expect(candidate.title).toEqual('Candidate')
  expect(candidate.paragraphs.length).toEqual(2)
  expect(candidate.examples.length).toEqual(1)
})

test('Invalid field type cannot be verified.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldType()
  delete candidate.jsonSchema
  expect(() => ensureFieldTypes(ajv, [candidate], [])).toThrow(JsonotronFieldTypeValidationError)
  expect(() => ensureFieldTypes(ajv, [candidate], [])).toThrow(/should have required property 'jsonSchema'/)
})

test('Field type with invalid JSON schema fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldType()
  candidate.jsonSchema = { type: 'invalidType' }
  expect(() => ensureFieldTypes(ajv, [candidate], [])).toThrow(JsonotronFieldTypeValidationError)
  expect(() => ensureFieldTypes(ajv, [candidate], [])).toThrow(/Unable to create field value validator/)
})

test('Field type with invalid value in the examples list fails verification but paragraphs object is still attached.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldType()
  candidate.examples.push({ value: 'invalid-value' })
  expect(() => ensureFieldTypes(ajv, [candidate], [])).toThrow(JsonotronFieldTypeValidationError)
  expect(() => ensureFieldTypes(ajv, [candidate], [])).toThrow(/Example value '"invalid-value"' at index 1 does not validate/)
  expect(candidate.examples[1].paragraphs).toEqual([])
})

test('Field type with invalid value in the valid test cases list fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldType()
  candidate.validTestCases.push('invalid-value')
  expect(() => ensureFieldTypes(ajv, [candidate], [])).toThrow(JsonotronFieldTypeValidationError)
  expect(() => ensureFieldTypes(ajv, [candidate], [])).toThrow(/Valid test case value '"invalid-value"' does not validate with the schema/)
})

test('Field type with valid value in the invalid test cases list fails verification.', () => {
  const ajv = createCustomisedAjv()
  const candidate = createValidFieldType()
  candidate.invalidTestCases.push(5)
  expect(() => ensureFieldTypes(ajv, [candidate], [])).toThrow(JsonotronFieldTypeValidationError)
  expect(() => ensureFieldTypes(ajv, [candidate], [])).toThrow(/Invalid test case value '5' does [(]but should not[)] validate/)
})
