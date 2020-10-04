/* eslint-env jest */
import { JsonotronFieldBlockDefinitionCompilationError, JsonotronInitialisationError } from '../errors'
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

function expectInitialisationFailure (ctorParameters, errorMessage) {
  try {
    const jsonotron = new Jsonotron(ctorParameters)
    expect(jsonotron).not.toBeDefined()
  } catch (err) {
    expect(err).toBeInstanceOf(JsonotronInitialisationError)
    expect(JSON.stringify(err)).toContain(errorMessage)
  }
}

function expectFieldBlockDefinitionCompilationFailure (fieldBlockDefinition, errorMessage) {
  try {
    const jsonotron = new Jsonotron({
      enumTypes: [createFullEnumTypeMinusDocs()],
      schemaTypes: [createFullSchemaTypeMinusDocs()]
    })

    jsonotron.compileFieldBlockDefinition(fieldBlockDefinition)
    throw new Error('Should not reach')
  } catch (err) {
    expect(err).toBeInstanceOf(JsonotronFieldBlockDefinitionCompilationError)
    expect(JSON.stringify(err)).toContain(errorMessage)
  }
}

test('Calling the constructor without types produces an empty Jsonotron.', () => {
  const jsonotron = new Jsonotron()
  expect(jsonotron).toBeDefined()
  expect(jsonotron.getPatchedEnumTypes()).toHaveLength(0)
  expect(jsonotron.getPatchedSchemaTypes()).toHaveLength(0)
  expect(jsonotron.getPatchedFieldBlockDefinitions()).toHaveLength(0)
})

test('Calling the constructor with valid enum types, schema types and field block definitions produces a Jsonotron.', () => {
  const jsonotron = new Jsonotron({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [createFullSchemaTypeMinusDocs()],
    fieldBlockDefinitions: [createFullFieldBlockDefinition()]
  })

  expect(jsonotron).toBeDefined()
  expect(jsonotron.getPatchedEnumTypes()).toHaveLength(1)
  expect(jsonotron.getPatchedSchemaTypes()).toHaveLength(1)
  expect(jsonotron.getPatchedFieldBlockDefinitions()).toHaveLength(1)
})

test('Calling the constructor with undocumented enum types and schema types and with documentation validation enabled throws an error.', () => {
  const ctorParams = {
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [createFullSchemaTypeMinusDocs()],
    validateDocs: true
  }

  expectInitialisationFailure(ctorParams, 'has invalid or missing properties')
})

test('Creating a Jsonotron with an invalid enum type produces errors.', () => {
  const enumType = createFullEnumTypeMinusDocs()
  delete enumType.items

  const ctorParams = {
    enumTypes: [enumType],
    schemaTypes: [createFullSchemaTypeMinusDocs()]
  }

  expectInitialisationFailure(ctorParams, 'Enum Type has invalid or missing properties')
})

test('Creating a Jsonotron with an invalid schema type produces errors.', () => {
  const schemaType = createFullSchemaTypeMinusDocs()
  delete schemaType.jsonSchema

  const ctorParams = {
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [schemaType]
  }

  expectInitialisationFailure(ctorParams, 'Schema Type has invalid or missing properties')
})

test('Creating a Jsonotron with an invalid field block definition produces errors.', () => {
  const fieldBlockDefinition = createFullFieldBlockDefinition()
  delete fieldBlockDefinition.name

  const ctorParams = {
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [createFullSchemaTypeMinusDocs()],
    fieldBlockDefinitions: [fieldBlockDefinition]
  }

  expectInitialisationFailure(ctorParams, 'Field Block Definition has invalid or missing properties')
})

test('Creating a Jsonotron with a schema type with an invalid json schema produces errors.', () => {
  const schemaType = createFullSchemaTypeMinusDocs()
  schemaType.jsonSchema = { type: 'not-a-valid-json-schema' }

  const ctorParams = {
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [schemaType]
  }

  expectInitialisationFailure(ctorParams, 'Schema Type JSON Schema compilation failed')
})

test('Creating a Jsonotron with an invalid example produces errors.', () => {
  const schemaType = createFullSchemaTypeMinusDocs()
  schemaType.examples.push({ value: 'invalid' })

  const ctorParams = {
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [schemaType]
  }

  expectInitialisationFailure(ctorParams, 'Verification failed for examples[1]')
})

test('Creating a Jsonotron with an invalid "valid test case" produces errors.', () => {
  const schemaType = createFullSchemaTypeMinusDocs()
  schemaType.validTestCases.push('invalid')

  const ctorParams = {
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [schemaType]
  }

  expectInitialisationFailure(ctorParams, 'Verification failed for validTestCases[1]')
})

test('Creating a Jsonotron with an invalid "invalid test case" produces errors.', () => {
  const schemaType = createFullSchemaTypeMinusDocs()
  schemaType.invalidTestCases.push({ pop: 80134911, country: 'fr' })

  const ctorParams = {
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [schemaType]
  }

  expectInitialisationFailure(ctorParams, 'Verification passed (but should have failed) for invalidTestCases[9]')
})

test('Creating a Jsootron with a field block definition with an unrecognised type produces errors.', () => {
  const candidate = createFullFieldBlockDefinition()
  candidate.fields.year2000.type = 'invalid'

  const ctorParams = {
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [createFullSchemaTypeMinusDocs()],
    fieldBlockDefinitions: [candidate]
  }

  expectInitialisationFailure(ctorParams, 'Field Block Definition JSON Schema generation failed')
})

test('Executing a field type validator produces the correct result.', () => {
  const jsonotron = new Jsonotron({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [createFullSchemaTypeMinusDocs()]
  })

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

  const candidate = createFullFieldBlockDefinition()

  expect(() => jsonotron.compileFieldBlockDefinition(candidate)).not.toThrow()
})

test('A malformed field block definition cannot be compiled.', () => {
  const candidate = createFullFieldBlockDefinition()
  delete candidate.fields.year2000.type

  expectFieldBlockDefinitionCompilationFailure(candidate, 'Field Block Definition has invalid or missing properties')
})

test('A field block definition with an unrecognised type cannot be compiled.', () => {
  const candidate = createFullFieldBlockDefinition()
  candidate.fields.year2000.type = 'invalid'

  expectFieldBlockDefinitionCompilationFailure(candidate, 'Field Block Definition JSON Schema generation failed')
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

test('Validating a field block definition with a dynamically provided definition causes compilation.', () => {
  const jsonotron = new Jsonotron({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [createFullSchemaTypeMinusDocs()]
  })

  expect(jsonotron.getPatchedFieldBlockDefinitions()).toHaveLength(0)

  const candidate1 = createFieldBlock()
  const fieldBlockDefinitionFields1 = createFullFieldBlockDefinition().fields
  const fieldBlockDefinitionFields2 = createFullFieldBlockDefinition().fields

  expect(jsonotron.validateFieldBlockWithFields(fieldBlockDefinitionFields1, candidate1)).toEqual({ recognised: true, validated: true, errors: null })
  expect(jsonotron.getPatchedFieldBlockDefinitions()).toHaveLength(1)

  // on second execution it will not compile, because the schema has been seen before,
  //  so the number of patched field block definitions remains at 1
  expect(jsonotron.validateFieldBlockWithFields(fieldBlockDefinitionFields2, candidate1)).toEqual({ recognised: true, validated: true, errors: null })
  expect(jsonotron.getPatchedFieldBlockDefinitions()).toHaveLength(1)
})
