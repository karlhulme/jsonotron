import { expect, test } from '@jest/globals'
import { RecordFactory, RecordTypeDef } from 'jsonotron-interfaces'
import {
  parseTypeLibrary, TestCaseInvalidationError, TestCaseValidationError,
  UnrecognisedPropertyTypeOnRecordTypeError,
  ValueValidationError,
  ValueValidator,
  UnrecognisedPropertyNameOnRecordTypeError,
  DuplicatePropertyNameOnRecordTypeError,
  UnrecognisedFactoryNameError
} from '../src'
import { reindentYaml, TEST_DOMAIN, testSmallIntType, testShortString, asError } from './shared.test'

const testRecord = reindentYaml(`
  ---
  kind: record
  system: test
  name: testRecord
  summary: A test record.
  properties:
  - name: one
    summary: The first property.
    propertyType: test/smallInt
  - name: someConst
    summary: A constant value.
    propertyType: test/shortString
    constant: hello
  - name: someArray
    summary: An array of values.
    propertyType: test/shortString
    isArray: true
  required:
  - one
  - someConst
  labels:
  - name: linkedTo
    value: otherType
  validTestCases:
  - value:
      one: 1
      someConst: hello
      someArray:
      - first
      - second
      - third
    summary: This is an example as well as a test case.
  invalidTestCases:
  - value: 5
    summary: This is not an acceptable test case.
  tags:
  - tag1
  - tag2
`)

function setupValidator () {
  const typeLibrary = parseTypeLibrary({ resourceStrings: [testRecord, testSmallIntType, testShortString], domain: TEST_DOMAIN })
  const validator = new ValueValidator(typeLibrary)
  return validator
}

test('A valid record type can be parsed.', async () => {
  const typeLibrary = parseTypeLibrary({ resourceStrings: [testRecord, testSmallIntType, testShortString] })
  expect(typeLibrary.recordTypes).toHaveLength(1)
  expect(typeLibrary.recordTypes[0].properties).toHaveLength(3)
  expect(typeLibrary.recordTypes[0].properties[0]).toHaveProperty('propertyTypeSystem', 'test')
  expect(typeLibrary.recordTypes[0].properties[0]).toHaveProperty('propertyTypeName', 'smallInt')
  expect(typeLibrary.recordTypes[0].properties[1]).toHaveProperty('propertyTypeSystem', 'test')
  expect(typeLibrary.recordTypes[0].properties[1]).toHaveProperty('propertyTypeName', 'shortString')
  expect(typeLibrary.recordTypes[0].properties[2]).toHaveProperty('propertyTypeSystem', 'test')
  expect(typeLibrary.recordTypes[0].properties[2]).toHaveProperty('propertyTypeName', 'shortString')
})

test('A record type with a property that references another record is accepted.', async () => {
  const testRecordThatRefsARecord = reindentYaml(`
    ---
    kind: record
    system: test
    name: testRecordThatRefsARecord
    summary: A test record that references another record.
    properties:
    - name: ref
      summary: The property that is a record.
      propertyType: testRecord
    validTestCases:
    - value:
        ref:
          one: 1
          someConst: hello
          someArray: []
      summary: This is a valid test case.
  `)

  const typeLibrary = parseTypeLibrary({ resourceStrings: [testRecordThatRefsARecord, testRecord, testSmallIntType, testShortString] })
  expect(typeLibrary.recordTypes).toHaveLength(2)
})

test('A record type with a valid factory name can be parsed.', async () => {
  const testRecordUsingFactory = reindentYaml(`
    ---
    kind: record
    system: test
    name: testRecordUsingFactory
    summary: A test record that uses a factory.
    properties:
    - name: one
      summary: The one property.
      propertyType: test/smallInt
    validTestCases:
    - value:
        one: 1
      summary: This is a valid test case.
    factories:
    - addTwoProp
  `)

  const addTwoPropFactory: RecordFactory = {
    name: 'addTwoProp',
    implementation: (source: RecordTypeDef) => [source, {
      ...source,
      name: 'testRecordUsingFactory2',
      properties: [
        ...source.properties,
        { name: 'two', summary: 'The second property', propertyType: 'test/smallInt' }
      ]
    }]
  }

  const typeLibrary = parseTypeLibrary({ resourceStrings: [testRecordUsingFactory, testRecord, testSmallIntType, testShortString], factories: [addTwoPropFactory] })
  expect(typeLibrary.recordTypes).toHaveLength(3)
})

test('A record type with an unknown valid factory name is rejected.', async () => {
  const testRecordUsingFactory = reindentYaml(`
    ---
    kind: record
    system: test
    name: testRecordUsingFactory
    summary: A test record that uses a factory.
    properties:
    - name: one
      summary: The one property.
      propertyType: test/smallInt
    validTestCases:
    - value:
        one: 1
      summary: This is a valid test case.
    factories:
    - unknownFactory
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [testRecordUsingFactory, testRecord, testSmallIntType, testShortString], factories: [] })).toThrow(asError(UnrecognisedFactoryNameError))
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

  expect(() => parseTypeLibrary({ resourceStrings: [recordTypeWithInvalidPropertyType] })).toThrow(asError(UnrecognisedPropertyTypeOnRecordTypeError))
})

test('A record type that describes an unknown property as required cannot be parsed.', async () => {
  const recordTypeWithInvalidRequiredProperty = reindentYaml(`
    ---
    kind: record
    system: test
    name: testRecord
    summary: A test record.
    properties:
    - name: one
      summary: The first property.
      propertyType: test/smallInt
    required:
    - unrecognisedProperty
    validTestCases:
    - value:
        one: 1
      summary: This is a valid test case.
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [recordTypeWithInvalidRequiredProperty, testSmallIntType] })).toThrow(asError(UnrecognisedPropertyNameOnRecordTypeError))
})

test('A record type with a property that does not conform to its assigned type is rejected.', async () => {
  const validator = setupValidator()
  expect(() => validator.validateValue('test/recordTypeWithVariants', { one: 'fail_on_string', twos: [2, 2, 2], three: 3, four: 4 })).toThrow(asError(ValueValidationError))
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
      propertyType: test/smallInt
    validTestCases:
    - value:
        one: hello
      summary: This is a valid test case.
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [recordTypeWithWrongTestCase, testSmallIntType] })).toThrow(asError(TestCaseValidationError))
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
      propertyType: test/smallInt
    validTestCases:
    - value:
        one: 1
      summary: This is a valid test case.
    invalidTestCases:
    - value:
        one: 1
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [recordTypeWithWrongInvalidTestCase, testSmallIntType] })).toThrow(asError(TestCaseInvalidationError))
})

test('A record type that declares the same property multiple times is rejected.', async () => {
  const recordTypeWitUnrecognisedRequired = reindentYaml(`
    ---
    kind: record
    system: test
    name: testRecord
    summary: A test record.
    properties:
    - name: one
      summary: The first property.
      propertyType: test/smallInt
    - name: one
      summary: This is a duplicate property.
      propertyType: test/smallInt
    validTestCases:
    - value:
        one: 1
      summary: This is a valid test case.
  `)

  expect(() => parseTypeLibrary({ resourceStrings: [recordTypeWitUnrecognisedRequired, testSmallIntType] })).toThrow(asError(DuplicatePropertyNameOnRecordTypeError))
})
