/* eslint-env jest */
import * as lib from './index'

test('The functions are exported.', () => {
  const testCases = [

    // compilation
    'compile',

    // shared
    'TypeSystem',
    'JSON_SCHEMA_DECLARATION',
    'JSON_SCHEMA_DEFINITIONS_PATH',

    // utils
    'deepClone',
    'pascalToTitleCase'
  ]

  testCases.forEach((testCase) => expect(lib).toHaveProperty(testCase))
})
