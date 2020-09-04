/* eslint-env jest */
import { compile } from './compile'

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

function createFullFieldBlockTypeMinusDocs () {
  return {
    name: 'popHistory',
    isNullable: true,
    fields: {
      year2000: { type: 'populace', isRequired: true },
      year2010: { type: 'populace' },
      year2020: { type: 'populace', default: { pop: 10000000, country: 'en' } }
    },
    examples: [{
      value: {
        year2000: { pop: 50000000, country: 'en' },
        year2010: { pop: 60000000, country: 'en' },
        year2020: { pop: 70000000, country: 'en' }
      }
    }]
  }
}

test('Compiling without resources produces no errors.', () => {
  const typeSystem = compile()

  expect(typeSystem.isSuccessful()).toEqual(true)
  expect(typeSystem.getPatchedEnumTypes()).toHaveLength(0)
  expect(typeSystem.getPatchedSchemaTypes()).toHaveLength(0)
  expect(typeSystem.getPatchedFieldBlockTypes()).toHaveLength(0)
})

test('Compiling valid enum, schema and field block types produces patched types and validators.', () => {
  const typeSystem = compile({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [createFullSchemaTypeMinusDocs()],
    fieldBlockTypes: [createFullFieldBlockTypeMinusDocs()]
  })

  expect(typeSystem.isSuccessful()).toEqual(true)
  expect(typeSystem.getPatchedEnumTypes()).toHaveLength(1)
  expect(typeSystem.getPatchedSchemaTypes()).toHaveLength(1)
  expect(typeSystem.getPatchedFieldBlockTypes()).toHaveLength(1)
})

test('Compiling an invalid enum type produces errors.', () => {
  const enumType = createFullEnumTypeMinusDocs()
  delete enumType.items

  const typeSystem = compile({
    enumTypes: [enumType],
    schemaTypes: [createFullSchemaTypeMinusDocs()],
    fieldBlockTypes: [createFullFieldBlockTypeMinusDocs()]
  })

  expect(typeSystem.isSuccessful()).toEqual(false)
  expect(typeSystem.toString()).toContain('Enum Type has invalid or missing properties')
})

test('Compiling an invalid schema type produces errors.', () => {
  const schemaType = createFullSchemaTypeMinusDocs()
  delete schemaType.jsonSchema

  const typeSystem = compile({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [schemaType],
    fieldBlockTypes: [createFullFieldBlockTypeMinusDocs()]
  })

  expect(typeSystem.isSuccessful()).toEqual(false)
  expect(typeSystem.toString()).toContain('Schema Type has invalid or missing properties')
})

test('Compiling a schema type with an invalid json schema produces errors.', () => {
  const schemaType = createFullSchemaTypeMinusDocs()
  schemaType.jsonSchema.type = 'invalid'

  const typeSystem = compile({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [schemaType],
    fieldBlockTypes: [createFullFieldBlockTypeMinusDocs()]
  })

  expect(typeSystem.isSuccessful()).toEqual(false)
  expect(typeSystem.toString()).toContain('Type compilation failed.')
})

test('Compiling a schema type with an invalid example produces errors.', () => {
  const schemaType = createFullSchemaTypeMinusDocs()
  schemaType.examples.push({ value: 'invalid' })

  const typeSystem = compile({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [schemaType],
    fieldBlockTypes: [createFullFieldBlockTypeMinusDocs()]
  })

  expect(typeSystem.isSuccessful()).toEqual(false)
  expect(typeSystem.toString()).toContain('Verification failed for examples[1]')
})

test('Compiling a schema type with an invalid "valid test case" produces errors.', () => {
  const schemaType = createFullSchemaTypeMinusDocs()
  schemaType.validTestCases.push('invalid')

  const typeSystem = compile({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [schemaType],
    fieldBlockTypes: [createFullFieldBlockTypeMinusDocs()]
  })

  expect(typeSystem.isSuccessful()).toEqual(false)
  expect(typeSystem.toString()).toContain('Verification failed for validTestCases[1]')
})

test('Compiling a schema type with an invalid "invalid test case" produces errors.', () => {
  const schemaType = createFullSchemaTypeMinusDocs()
  schemaType.invalidTestCases.push({ pop: 80134911, country: 'fr' })

  const typeSystem = compile({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [schemaType],
    fieldBlockTypes: [createFullFieldBlockTypeMinusDocs()]
  })

  expect(typeSystem.isSuccessful()).toEqual(false)
  expect(typeSystem.toString()).toContain('Verification passed (but should have failed) for invalidTestCases[9]')
})

test('Compiling an invalid field block type produces errors.', () => {
  const fieldBlockType = createFullFieldBlockTypeMinusDocs()
  delete fieldBlockType.fields

  const typeSystem = compile({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [createFullSchemaTypeMinusDocs()],
    fieldBlockTypes: [fieldBlockType]
  })

  expect(typeSystem.isSuccessful()).toEqual(false)
  expect(typeSystem.toString()).toContain('Field Block Type has invalid or missing properties.')
})

test('Compiling a field block type with an invalid example produces errors.', () => {
  const fieldBlockType = createFullFieldBlockTypeMinusDocs()
  fieldBlockType.examples.push({ value: 'invalid' })

  const typeSystem = compile({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [createFullSchemaTypeMinusDocs()],
    fieldBlockTypes: [fieldBlockType]
  })

  expect(typeSystem.isSuccessful()).toEqual(false)
  expect(typeSystem.toString()).toContain('Verification failed for examples[1]')
})

test('Compiling a field block type with an invalid default produces errors.', () => {
  const fieldBlockType = createFullFieldBlockTypeMinusDocs()
  fieldBlockType.fields.year2020.default = 'invalid'

  const typeSystem = compile({
    enumTypes: [createFullEnumTypeMinusDocs()],
    schemaTypes: [createFullSchemaTypeMinusDocs()],
    fieldBlockTypes: [fieldBlockType]
  })

  expect(typeSystem.isSuccessful()).toEqual(false)
  expect(typeSystem.toString()).toContain('Verification failed for default value of field')
})
