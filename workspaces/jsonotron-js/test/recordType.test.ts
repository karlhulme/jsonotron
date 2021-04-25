import { expect, test } from '@jest/globals'
import {
  parseTypeLibrary, RecordTypeTestCaseInvalidationError, RecordTypeTestCaseValidationError,
  RecordTypeVariantUnrecognisedPropertyError, UnrecognisedTypeError, ValueValidationError,
  ValueValidator
} from '../src'
import { reindentYaml, TEST_DOMAIN, otherType, asError } from './shared.test'

const recordType = reindentYaml(`
  ---
  kind: record
  system: test
  name: testRecord
  summary: A test record.
  properties:
  - name: one
    summary: The first property.
    propertyType: test/other
  validTestCases:
  - value:
      one: 1
    summary: This is an example as well as a test case.
`)

const recordTypeWithVariants = reindentYaml(`
  ---
  kind: record
  system: test
  name: recordTypeWithVariants
  summary: A test record.
  properties:
  - name: one
    summary: The first property.
    propertyType: test/other
  - name: twos
    summary: The second property.
    propertyType: test/other
    isArray: true
    isRequired: true
  - name: three
    summary: The third property.
    propertyType: test/other
    deprecated: We don't use this anymore.
  - name: four
    summary: The fourth property.
    propertyType: test/other
  variants:
  - name: testRecordWithIncludes
    partial: false
    includeProperties:
    - one
    - twos
  - name: testRecordWithExcludes
    partial: true
    excludeProperties:
    - four
  validTestCases:
  - value:
      one: 1
      twos: [2, 2, 2]
      three: 3
      four: 4
    summary: This is an example as well as a test case.
  invalidTestCases:
  - value:
      one: hello
`)

function setupValidator () {
  const typeLibrary = parseTypeLibrary({ resourceStrings: [recordType, recordTypeWithVariants, otherType] })
  const validator = new ValueValidator(typeLibrary, TEST_DOMAIN)
  return validator
}

test('A valid record type can be parsed.', async () => {
  expect(() => parseTypeLibrary({ resourceStrings: [recordType, otherType] })).not.toThrow()
  expect(() => parseTypeLibrary({ resourceStrings: [recordTypeWithVariants, otherType] })).not.toThrow()
})

test('A record type that describes a property of an unknown type cannot be parsed.', async () => {
  const recordTypeWithInvalidPropertyType = reindentYaml(`
    ---
    kind: record
    system: test
    name: testRecord
    summary: A test record.
    properties:
    - name: one
      summary: The first property.
      propertyType: test/unrecognised
    validTestCases:
    - value:
        one: 1
      summary: This is a valid test case.
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [recordTypeWithInvalidPropertyType] })).toThrow(asError(UnrecognisedTypeError))
})

test('A valid record type value passes validation.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/recordTypeWithVariants', { one: 1, twos: [2, 2, 2], three: 3, four: 4 })).not.toThrow()
})

test('A record type with a property that does not conform to its assigned type is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/recordTypeWithVariants', { one: 'fail_on_string', twos: [2, 2, 2], three: 3, four: 4 })).toThrow(asError(ValueValidationError))
})

test('A record type that describes a variant with an unrecognised include property is rejected.', async () => {
  const recordTypeWithInvalidPropertyType = reindentYaml(`
    ---
    kind: record
    system: test
    name: testRecord
    summary: A test record.
    properties:
    - name: one
      summary: The first property.
      propertyType: test/other
    validTestCases:
    - value:
        one: 1
      summary: This is a valid test case.
    variants:
    - name: failingVariant
      partial: false
      includeProperties:
      - unrecognised
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [recordTypeWithInvalidPropertyType, otherType] })).toThrow(asError(RecordTypeVariantUnrecognisedPropertyError))
})

test('A record type that describes a variant with an unrecognised exclude property is rejected.', async () => {
  const recordTypeWithInvalidPropertyType = reindentYaml(`
    ---
    kind: record
    system: test
    name: testRecord
    summary: A test record.
    properties:
    - name: one
      summary: The first property.
      propertyType: test/other
    validTestCases:
    - value:
        one: 1
      summary: This is a valid test case.
    variants:
    - name: failingVariant
      partial: false
      excludeProperties:
      - unrecognised
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [recordTypeWithInvalidPropertyType, otherType] })).toThrow(asError(RecordTypeVariantUnrecognisedPropertyError))
})

test('A record type that describes a valid test cases that is actually not valid is rejected.', async () => {
  const recordTypeWithInvalidPropertyType = reindentYaml(`
    ---
    kind: record
    system: test
    name: testRecord
    summary: A test record.
    properties:
    - name: one
      summary: The first property.
      propertyType: test/other
    validTestCases:
    - value:
        one: hello
      summary: This is a valid test case.
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [recordTypeWithInvalidPropertyType, otherType] })).toThrow(asError(RecordTypeTestCaseValidationError))
})

test('A record type that describes an invalid test cases that is actually valid is rejected.', async () => {
  const recordTypeWithInvalidPropertyType = reindentYaml(`
    ---
    kind: record
    system: test
    name: testRecord
    summary: A test record.
    properties:
    - name: one
      summary: The first property.
      propertyType: test/other
    validTestCases:
    - value:
        one: 1
      summary: This is a valid test case.
    invalidTestCases:
    - one: 1
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [recordTypeWithInvalidPropertyType, otherType] })).toThrow(asError(RecordTypeTestCaseInvalidationError))
})