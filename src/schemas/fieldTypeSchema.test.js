/* eslint-env jest */
const { createCustomisedAjv } = require('../validator')
const fieldTypeSchema = require('./fieldTypeSchema')

test('Accept minimal field type.', () => {
  const ajv = createCustomisedAjv()

  const validRegularFieldType = {
    name: 'minimal',
    type: 'schema',
    jsonSchema: {
      type: 'string'
    }
  }

  expect(ajv.validate(fieldTypeSchema, validRegularFieldType)).toEqual(true)
})

test('Accept valid field type.', () => {
  const ajv = createCustomisedAjv()

  const validFieldType = {
    name: 'integer',
    type: 'schema',
    title: 'The Integer',
    category: 'number',
    paragraphs: [
      'This is line one.',
      'This is line two.'
    ],
    examples: [
      { value: 12, paragraphs: ['yet more', 'explanation'] },
      { value: 21, paragraphs: ['explanation', 'yet more'] }
    ],
    validTestCases: [100000000, -10000000],
    invalidTestCases: ['a string', '', null, true, {}, []],
    jsonSchema: {
      type: 'integer'
    },
    referencedFieldTypes: ['dependentOne', 'dependentTwo'],
    referencedEnumTypes: []
  }

  expect(ajv.validate(fieldTypeSchema, validFieldType)).toEqual(true)
})
