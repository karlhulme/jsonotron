/* eslint-env jest */
import { validateTypeSystem } from './validateTypeSystem'

function createFullEnumType () {
  return {
    name: 'countryCode',
    title: 'Country Code',
    paragraphs: ['A code for a country.'],
    items: [
      { value: 'en', paragraphs: ['England'], symbol: 'EN' },
      { value: 'us', paragraphs: ['United States'], isDeprecated: false },
      { value: 'fr', paragraphs: ['France'] }
    ]
  }
}

function createFullSchemaType () {
  return {
    name: 'populace',
    title: 'Populace',
    paragraphs: ['A record of a countries population.'],
    examples: [
      { value: { pop: 60100200, country: 'en' }, paragraphs: ['numbers 1 to 3'] }
    ],
    validTestCases: [{ pop: 1, country: 'en' }],
    invalidTestCases: ['a string', '', null, true, {}, [], -34.56, -1, 0],
    jsonSchema: {
      type: 'object',
      properties: {
        pop: { type: 'integer', exclusiveMinimum: 0 },
        country: { $ref: '#/definitions/countryCode' }
      },
      required: ['pop', 'country']
    },
    referencedSchemaTypes: [],
    referencedEnumTypes: ['countryCode']
  }
}

test('A type system with an valid enum and schema types passes verification.', () => {
  const result = validateTypeSystem([createFullEnumType()], [createFullSchemaType()], [])
  expect(result.isSuccessful()).toEqual(true)
})

test('A type system with an invalid enum type fails verification and also causes schema types that use it to also fail verification.', () => {
  const enumType = createFullEnumType()
  delete enumType.items
  const result = validateTypeSystem([enumType], [createFullSchemaType()], [])
  expect(result.isSuccessful()).toEqual(false)
})

test('A type system with an invalid schema type fails verification.', () => {
  const schemaType = createFullSchemaType()
  delete schemaType.jsonSchema
  const result = validateTypeSystem([createFullEnumType()], [schemaType], [])
  expect(result.isSuccessful()).toEqual(false)
})

test('A type system with an invalid json schema on a schema type fails verification.', () => {
  const schemaType = createFullSchemaType()
  schemaType.jsonSchema.type = 'invalid'
  const result = validateTypeSystem([createFullEnumType()], [schemaType], [])
  expect(result.isSuccessful()).toEqual(false)
})

test('A type system with a schema with invalid examples fails verification.', () => {
  const schemaType = createFullSchemaType()
  schemaType.examples.push({ value: 'invalid' })
  const result = validateTypeSystem([createFullEnumType()], [schemaType], [])
  expect(result.isSuccessful()).toEqual(false)
})

test('A type system with a schema with invalid test cases fails verification.', () => {
  const schemaType = createFullSchemaType()
  schemaType.validTestCases.push('invalid')
  const result = validateTypeSystem([createFullEnumType()], [schemaType], [])
  expect(result.isSuccessful()).toEqual(false)
})

test('A type system with a schema with invalid test cases that are actually valid fails verification.', () => {
  const schemaType = createFullSchemaType()
  schemaType.invalidTestCases.push({ pop: 80134911, country: 'fr' })
  const result = validateTypeSystem([createFullEnumType()], [schemaType], [])
  expect(result.isSuccessful()).toEqual(false)
})
