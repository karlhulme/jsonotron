/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const fieldTypeSchema = require('./fieldTypeSchema')

test('Accept valid regular field type.', () => {
  const ajv = createCustomisedAjv()

  const validRegularFieldType = {
    name: 'integer',
    type: 'schema',
    category: 'number',
    validTestCases: [100000000, -10000000],
    invalidTestCases: ['a string', '', null, true, {}, []],
    jsonSchema: {
      type: 'integer'
    }
  }

  expect(ajv.validate(fieldTypeSchema, validRegularFieldType)).toEqual(true)
})

test('Accept valid regular field type with referenced field types.', () => {
  const ajv = createCustomisedAjv()

  const validRegularFieldTypeWithRefs = {
    name: 'integer',
    type: 'schema',
    category: 'number',
    validTestCases: [-25, 0, 25],
    invalidTestCases: ['a string', '', null, true, {}, []],
    jsonSchema: {
      type: 'integer'
    },
    referencedFieldTypes: ['dependentOne', 'dependentTwo']
  }

  expect(ajv.validate(fieldTypeSchema, validRegularFieldTypeWithRefs)).toEqual(true)
})

test('Accept valid enum field type with optional symbols.', () => {
  const ajv = createCustomisedAjv()

  const validEnumFieldType = {
    name: 'currencyCode',
    type: 'enum',
    category: 'money',
    values: [
      { value: 'AED', symbol: 'A' },
      { value: 'AFN', symbol: 'B' },
      { value: 'ALL' }
    ]
  }

  expect(ajv.validate(fieldTypeSchema, validEnumFieldType)).toEqual(true)
})

test('Reject field types with both regular and enum fields.', () => {
  const ajv = createCustomisedAjv()

  const invalidFieldType = {
    name: 'integer',
    type: 'schema',
    category: 'number',
    validTestCases: [-25],
    invalidTestCases: ['a string'],
    jsonSchema: {
      type: 'integer'
    },
    values: [
      { value: 'AED', description: 'United Arab Emirates Dirham' },
      { value: 'AFN', description: 'Afghan Afghani' },
      { value: 'ALL', description: 'Albanian Lek' }
    ]
  }
  expect(ajv.validate(fieldTypeSchema, invalidFieldType)).toEqual(false)
  expect(ajv.errors).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        keyword: 'additionalProperties',
        params: {
          additionalProperty: 'values'
        }
      }),
      expect.objectContaining({
        keyword: 'additionalProperties',
        params: {
          additionalProperty: 'validTestCases'
        }
      }),
      expect.objectContaining({
        keyword: 'oneOf',
        schemaPath: '#/oneOf'
      })
    ])
  )
})

test('Reject field types with neither regular nor enum fields.', () => {
  const ajv = createCustomisedAjv()

  const invalidFieldType = {
    name: 'integer',
    type: 'schema',
    category: 'number'
  }
  expect(ajv.validate(fieldTypeSchema, invalidFieldType)).toEqual(false)
  expect(ajv.errors).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        keyword: 'required',
        params: {
          missingProperty: 'validTestCases'
        }
      }),
      expect.objectContaining({
        keyword: 'const',
        params: {
          allowedValue: 'enum'
        }
      }),
      expect.objectContaining({
        keyword: 'oneOf',
        schemaPath: '#/oneOf'
      })
    ])
  )
})
