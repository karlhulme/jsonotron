/* eslint-env jest */
import { Jsonotron, coreEnumTypes, coreSchemaTypes } from '../src/index'

test('The core enum types and schema types can be validated as a complete type system.', () => {
  expect(() => new Jsonotron({
    enumTypes: coreEnumTypes,
    schemaTypes: coreSchemaTypes,
    validateDocs: true
  })).not.toThrow()
})

test('The enum types array is populated.', () => {
  const testCases = [
    'boolean',
    'callingCode',
    'countryCode',
    'timeZone',
    'yesNo'
  ]

  testCases.forEach((testCase) => expect(coreEnumTypes.findIndex(et => et.name === testCase)).toBeGreaterThan(-1))
})

test('The schema types array is populated.', () => {
  const testCases = [
    'address',
    'date',
    'dateTimeLocal',
    'dateTimeUtc',
    'float',
    'geoJsonPoint',
    'geoJsonPolygon',
    'integer',
    'mediumString',
    'object',
    'string',
    'telephoneNo',
    'time',
    'timestamp',
    'uuid',
    'webAddress'
  ]

  testCases.forEach((testCase) => expect(coreSchemaTypes.findIndex(st => st.name === testCase)).toBeGreaterThan(-1))
})
