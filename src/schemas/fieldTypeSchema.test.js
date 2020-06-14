/* eslint-env jest */
const { createAjv } = require('./shared.test')
const fieldTypeSchema = require('./fieldTypeSchema')

test('Accept valid regular field type.', () => {
  const ajv = createAjv()

  const validRegularFieldType = {
    name: 'integer',
    title: 'Integer',
    description: 'A whole number.',
    examples: [-25, 0, 25],
    invalidExamples: ['a string', '', null, true, {}, []],
    jsonSchema: {
      type: 'integer'
    }
  }

  expect(ajv.validate(fieldTypeSchema, validRegularFieldType)).toEqual(true)
})

test('Accept valid regular field type with referenced field types.', () => {
  const ajv = createAjv()

  const validRegularFieldTypeWithRefs = {
    name: 'integer',
    title: 'Integer',
    description: 'A whole number.',
    examples: [-25, 0, 25],
    invalidExamples: ['a string', '', null, true, {}, []],
    jsonSchema: {
      type: 'integer'
    },
    referencedFieldTypes: ['dependentOne', 'dependentTwo']
  }

  expect(ajv.validate(fieldTypeSchema, validRegularFieldTypeWithRefs)).toEqual(true)
})

test('Accept valid regular field type with custom format validator.', () => {
  const ajv = createAjv()

  const validRegularFieldTypeWithCustomFormatValidator = {
    name: 'stringWith2',
    title: 'String With 2',
    description: 'A string containing the digit 2.',
    examples: ['25'],
    invalidExamples: ['a string', '', null, true, {}, []],
    jsonSchema: {
      type: 'string',
      format: 'stringWithA2Digit'
    },
    customFormatValidators: {
      stringWithA2Digit: v => v.includes('2')
    }
  }

  expect(ajv.validate(fieldTypeSchema, validRegularFieldTypeWithCustomFormatValidator)).toEqual(true)
})

test('Accept valid enum field type.', () => {
  const ajv = createAjv()

  const validEnumFieldType = {
    name: 'currencyCode',
    title: 'Currency Code',
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
  const ajv = createAjv()

  const invalidFieldType = {
    name: 'integer',
    title: 'Integer',
    description: 'A whole number.',
    examples: [-25],
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
          additionalProperty: 'examples'
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
  const ajv = createAjv()

  const invalidFieldType = {
    name: 'integer',
    title: 'Integer',
    description: 'A whole number.'
  }
  expect(ajv.validate(fieldTypeSchema, invalidFieldType)).toEqual(false)
  expect(ajv.errors).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        keyword: 'required',
        params: {
          missingProperty: 'examples'
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
