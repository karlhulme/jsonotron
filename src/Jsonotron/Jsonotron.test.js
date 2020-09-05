/* eslint-env jest */
import { Jsonotron } from './Jsonotron'

function createFullEnumTypeMinusDocs () {
  return {
    name: 'countryCode',
    items: [
      { value: 'en', text: 'England', symbol: 'EN' },
      { value: 'us', text: 'United States', isDeprecated: false },
      { value: 'fr', text: 'France' }
    ]
  }
}

function createFullSchemaTypeMinusDocs () {
  return {
    name: 'populace',
    examples: [
      { value: { pop: 60100200, country: 'en' } }
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
    }
  }
}

function createFullFieldBlockDefinition () {
  return {
    name: 'popHistory',
    fields: {
      year2000: { type: 'populace', isRequired: true },
      year2010: { type: 'populace' },
      year2020: { type: 'populace' }
    }
  }
}

function createFieldBlock () {
  return {
    year2000: { pop: 40000000, country: 'en' },
    year2010: { pop: 50000000, country: 'en' },
    year2020: { pop: 60000000, country: 'en' }
  }
}

test('Creating a Jsonotron without types produces no errors and warnings.', () => {
  const jsonotron = new Jsonotron()

  expect(jsonotron.isSuccessful()).toEqual(true)
  expect(jsonotron.isSuccessfulWithNoWarnings()).toEqual(true)
  expect(jsonotron.getPatchedEnumTypes()).toHaveLength(0)
  expect(jsonotron.getPatchedSchemaTypes()).toHaveLength(0)
})

test('Creating a Jsonotron with valid enum types and schema types but missing docs produces patched types and validators as well as warnings.', () => {
  const jsonotron = new Jsonotron({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [createFullSchemaTypeMinusDocs()]
  })

  expect(jsonotron.isSuccessful()).toEqual(true)
  expect(jsonotron.isSuccessfulWithNoWarnings()).toEqual(false)
  expect(jsonotron.getPatchedEnumTypes()).toHaveLength(1)
  expect(jsonotron.getPatchedSchemaTypes()).toHaveLength(1)
})

test('Creating a Jsonotron with an invalid enum type produces errors.', () => {
  const enumType = createFullEnumTypeMinusDocs()
  delete enumType.items

  const jsonotron = new Jsonotron({
    enumTypes: [enumType],
    schemaTypes: [createFullSchemaTypeMinusDocs()]
  })

  expect(jsonotron.isSuccessful()).toEqual(false)
  expect(jsonotron.toString()).toContain('Enum Type has invalid or missing properties')
})

test('Creating a Jsonotron with an invalid schema type produces errors.', () => {
  const schemaType = createFullSchemaTypeMinusDocs()
  delete schemaType.jsonSchema

  const jsonotron = new Jsonotron({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [schemaType]
  })

  expect(jsonotron.isSuccessful()).toEqual(false)
  expect(jsonotron.toString()).toContain('Schema Type has invalid or missing properties')
})

test('Creating a Jsonotron with an invalid json schema produces errors.', () => {
  const schemaType = createFullSchemaTypeMinusDocs()
  schemaType.jsonSchema.type = 'invalid'

  const jsonotron = new Jsonotron({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [schemaType]
  })

  expect(jsonotron.isSuccessful()).toEqual(false)
  expect(jsonotron.toString()).toContain('Schema Type JSON Schema compilation failed.')
})

test('Creating a Jsonotron with an invalid example produces errors.', () => {
  const schemaType = createFullSchemaTypeMinusDocs()
  schemaType.examples.push({ value: 'invalid' })

  const jsonotron = new Jsonotron({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [schemaType]
  })

  expect(jsonotron.isSuccessful()).toEqual(false)
  expect(jsonotron.toString()).toContain('Verification failed for examples[1]')
})

test('Creating a Jsonotron with an invalid "valid test case" produces errors.', () => {
  const schemaType = createFullSchemaTypeMinusDocs()
  schemaType.validTestCases.push('invalid')

  const jsonotron = new Jsonotron({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [schemaType]
  })

  expect(jsonotron.isSuccessful()).toEqual(false)
  expect(jsonotron.toString()).toContain('Verification failed for validTestCases[1]')
})

test('Creating a Jsonotron with an invalid "invalid test case" produces errors.', () => {
  const schemaType = createFullSchemaTypeMinusDocs()
  schemaType.invalidTestCases.push({ pop: 80134911, country: 'fr' })

  const jsonotron = new Jsonotron({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [schemaType]
  })

  expect(jsonotron.isSuccessful()).toEqual(false)
  expect(jsonotron.toString()).toContain('Verification passed (but should have failed) for invalidTestCases[9]')
})

test('Executing a field type validator produces the correct result.', () => {
  const jsonotron = new Jsonotron({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [createFullSchemaTypeMinusDocs()]
  })

  expect(jsonotron.isSuccessful()).toEqual(true)

  expect(jsonotron.validateFieldValue('countryCode', 'fr')).toEqual({ recognised: true, validated: true, errors: null })
  expect(jsonotron.validateFieldValue('countryCode', 'de')).toEqual({ recognised: true, validated: false, errors: expect.anything() })

  expect(jsonotron.validateFieldValue('populace', { pop: 60100200, country: 'en' })).toEqual({ recognised: true, validated: true, errors: null })
  expect(jsonotron.validateFieldValue('populace', { pop_error: 60100200, country: 'en' })).toEqual({ recognised: true, validated: false, errors: expect.anything() })

  expect(jsonotron.validateFieldValue('madeup', 'fr')).toEqual({ recognised: false, validated: false, errors: null })
})

test('A valid field block definition can be compiled.', () => {
  const jsonotron = new Jsonotron({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [createFullSchemaTypeMinusDocs()]
  })

  expect(jsonotron.compileFieldBlockDefinition(createFullFieldBlockDefinition())).toEqual({
    compiled: true,
    errors: null
  })
})

test('A malformed field block definition cannot be compiled.', () => {
  const jsonotron = new Jsonotron({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [createFullSchemaTypeMinusDocs()]
  })

  const candidate = createFullFieldBlockDefinition()
  delete candidate.fields.year2000.type

  expect(jsonotron.compileFieldBlockDefinition(candidate)).toEqual({
    compiled: false,
    errors: [{
      typeName: 'popHistory',
      message: 'Field Block Definition has invalid or missing properties.',
      details: expect.anything()
    }]
  })
})

test('A field block definition with an unrecognised type cannot be compiled.', () => {
  const jsonotron = new Jsonotron({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [createFullSchemaTypeMinusDocs()]
  })

  const candidate = createFullFieldBlockDefinition()
  candidate.fields.year2000.type = 'invalid'

  expect(jsonotron.compileFieldBlockDefinition(candidate)).toEqual({
    compiled: false,
    errors: [{
      typeName: 'popHistory',
      message: 'Field Block Definition JSON Schema generation failed.',
      details: expect.anything()
    }]
  })
})

test('Executing a field block definition validator produces the correct result.', () => {
  const jsonotron = new Jsonotron({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [createFullSchemaTypeMinusDocs()]
  })

  const candidate1 = createFieldBlock()
  jsonotron.compileFieldBlockDefinition(createFullFieldBlockDefinition())
  expect(jsonotron.validateFieldBlock('popHistory', candidate1)).toEqual({ recognised: true, validated: true, errors: null })

  const candidate2 = createFieldBlock()
  delete candidate2.year2000 // this is a required field
  expect(jsonotron.validateFieldBlock('popHistory', { pop_error: 10000000, country: 'en' })).toEqual({ recognised: true, validated: false, errors: expect.anything() })

  expect(jsonotron.validateFieldBlock('madeup', { anything: 'here' })).toEqual({ recognised: false, validated: false, errors: null })
})
