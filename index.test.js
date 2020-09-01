/* eslint-env jest */
import * as lib from './index'

test('The functions are exported.', () => {
  const testCases = [
    // enum types
    'createEnumTypeSchema',
    'validateEnumType',
    'patchEnumType',

    // json schema validation
    'createCustomisedAjv',
    'ValidationResult',

    // schema types
    'createSchemaTypeSchema',
    'validateSchemaType',
    'patchSchemaType',

    // type system
    'validateTypeSystem',

    // utils
    'consts'
  ]

  testCases.forEach((testCase) => expect(lib).toHaveProperty(testCase))
})
