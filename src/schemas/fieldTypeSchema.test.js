/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const fieldTypeSchema = require('./fieldTypeSchema')

test('Accept valid regular field type.', () => {
  const ajv = createCustomisedAjv()

  const validRegularFieldType = {
    name: 'integer',
    title: 'Integer',
    category: 'Number',
    description: 'A whole number.',
    docExamples: [-25, 0, 25],
    validExamples: [100000000, -10000000],
    invalidExamples: ['a string', '', null, true, {}, []],
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
    title: 'Integer',
    category: 'Number',
    description: 'A whole number.',
    docExamples: [-25, 0, 25],
    invalidExamples: ['a string', '', null, true, {}, []],
    jsonSchema: {
      type: 'integer'
    },
    referencedFieldTypes: ['dependentOne', 'dependentTwo']
  }

  expect(ajv.validate(fieldTypeSchema, validRegularFieldTypeWithRefs)).toEqual(true)
})

test('Accept valid enum field type.', () => {
  const ajv = createCustomisedAjv()

  const validEnumFieldType = {
    name: 'currencyCode',
    title: 'Currency Code',
    category: 'Money',
    description: 'A currency designator from ISO 4217.',
    values: [
      { value: 'AED', description: 'United Arab Emirates Dirham' },
      { value: 'AFN', description: 'Afghan Afghani' },
      { value: 'ALL', description: 'Albanian Lek' }
    ]
  }

  expect(ajv.validate(fieldTypeSchema, validEnumFieldType)).toEqual(true)
})

test('Reject field types with both regular and enum fields.', () => {
  const ajv = createCustomisedAjv()

  const invalidFieldType = {
    name: 'integer',
    title: 'Integer',
    category: 'Number',
    description: 'A whole number.',
    docExamples: [-25],
    invalidExamples: ['a string'],
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
          additionalProperty: 'docExamples'
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
    title: 'Integer',
    category: 'Number',
    description: 'A whole number.'
  }
  expect(ajv.validate(fieldTypeSchema, invalidFieldType)).toEqual(false)
  expect(ajv.errors).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        keyword: 'required',
        params: {
          missingProperty: 'docExamples'
        }
      }),
      expect.objectContaining({
        keyword: 'required',
        params: {
          missingProperty: 'values'
        }
      }),
      expect.objectContaining({
        keyword: 'oneOf',
        schemaPath: '#/oneOf'
      })
    ])
  )
})
