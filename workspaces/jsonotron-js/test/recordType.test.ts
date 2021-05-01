import { expect, test } from '@jest/globals'
import {
  parseTypeLibrary, TestCaseInvalidationError, TestCaseValidationError,
  RecordTypeVariantUnrecognisedPropertyError, UnrecognisedTypeError, ValueValidationError,
  ValueValidator,
  RecordTypeVariantMissingPropertyArrayError
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
  tags:
  - tag1
  - tag2
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
    summary: The first variant using includeProperties.
    required:
    - one
    - twos
    includeProperties:
    - one
    - twos
  - name: testRecordWithExcludes
    summary: The second variant using excludeProperties.
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
  const typeLibrary = parseTypeLibrary({ resourceStrings: [recordType, recordTypeWithVariants, otherType], domain: TEST_DOMAIN })
  const validator = new ValueValidator(typeLibrary)
  return validator
}

test('A valid record type can be parsed.', async () => {
  const typeLibrary = parseTypeLibrary({ resourceStrings: [recordType, otherType] })
  expect(typeLibrary.recordTypes).toHaveLength(1)
  expect(typeLibrary.recordTypes[0].properties).toHaveLength(1)
  expect(typeLibrary.recordTypes[0].properties[0]).toHaveProperty('propertyTypeSystem', 'test')
  expect(typeLibrary.recordTypes[0].properties[0]).toHaveProperty('propertyTypeName', 'other')
})

test('A valid record type with variants can be parsed.', async () => {
  const typeLibrary = parseTypeLibrary({ resourceStrings: [recordTypeWithVariants, otherType] })
  expect(typeLibrary.recordTypes).toHaveLength(3)
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

test('A valid record type value passes validation for the main record and its variants.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/recordTypeWithVariants', { one: 1, twos: [2, 2, 2], three: 3, four: 4 })).not.toThrow()
  expect(() => validator.validateValue('test/testRecordWithIncludes', { one: 1, twos: [2, 2, 2] })).not.toThrow()
  expect(() => validator.validateValue('test/testRecordWithExcludes', { one: 1, twos: [2, 2, 2], three: 3 })).not.toThrow()
})

test('A record type with a property that does not conform to its assigned type is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/recordTypeWithVariants', { one: 'fail_on_string', twos: [2, 2, 2], three: 3, four: 4 })).toThrow(asError(ValueValidationError))
})

test('A record type that describes a variant with an unrecognised include property is rejected.', async () => {
  const recordTypeWithUnrecognisedInclude = reindentYaml(`
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
      summary: A failing variant due to invalid include properties.
      includeProperties:
      - unrecognised
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [recordTypeWithUnrecognisedInclude, otherType] })).toThrow(asError(RecordTypeVariantUnrecognisedPropertyError))
})

test('A record type that describes a variant with an unrecognised exclude property is rejected.', async () => {
  const recordTypeWitUnrecognisedExclude = reindentYaml(`
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
      summary: An invalid variant due to invalid properties.
      excludeProperties:
      - unrecognised
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [recordTypeWitUnrecognisedExclude, otherType] })).toThrow(asError(RecordTypeVariantUnrecognisedPropertyError))
})

test('A record type that describes a variant with neither includeProperties nor excludeProperties is rejected.', async () => {
  const recordTypeWitUnrecognisedExclude = reindentYaml(`
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
      summary: An invalid variant due to no include/exclude property arrays.
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [recordTypeWitUnrecognisedExclude, otherType] })).toThrow(asError(RecordTypeVariantMissingPropertyArrayError))
})

test('A record type that describes a variant with an unrecognised required property is rejected.', async () => {
  const recordTypeWitUnrecognisedRequired = reindentYaml(`
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
      summary: An invalid variant due to invalid required values.
      includeProperties:
      - one
      required:
      - unrecognisedProperty
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [recordTypeWitUnrecognisedRequired, otherType] })).toThrow(asError(RecordTypeVariantUnrecognisedPropertyError))
})

test('A record type that describes a valid test cases that is actually not valid is rejected.', async () => {
  const recordTypeWithWrongTestCase = reindentYaml(`
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

  expect(() => parseTypeLibrary({ resourceStrings: [recordTypeWithWrongTestCase, otherType] })).toThrow(asError(TestCaseValidationError))
})

test('A record type that describes an invalid test cases that is actually valid is rejected.', async () => {
  const recordTypeWithWrongInvalidTestCase = reindentYaml(`
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
    - value:
        one: 1
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [recordTypeWithWrongInvalidTestCase, otherType] })).toThrow(asError(TestCaseInvalidationError))
})