/* eslint-env jest */
import * as lib from './index'

test('The functions are exported.', () => {
  const testCases = [
    // type system
    'validateTypeSystem',

    // enum types
    'createEnumTypeSchema',
    'validateEnumType',
    'patchEnumType',

    // schema types
    'createSchemaTypeSchema',
    'validateSchemaType',
    'patchSchemaType',

    // utils
    'consts',
    'createCustomisedAjv',
    'ValidationResult'
  ]

  testCases.forEach((testCase) => expect(lib).toHaveProperty(testCase))
})
