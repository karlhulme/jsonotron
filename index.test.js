/* eslint-env jest */
import * as lib from './index.js'

test('The functions are exported.', () => {
  const testCases = [

    // Jsonotron
    'Jsonotron',

    // errors
    'JsonotronFieldBlockDefinitionCompilationError',
    'JsonotronInitialisationError',

    // jsonSchemaValidation
    'createCustomisedAjv',

    // shared
    'createTypeProcError',
    'deepClone',
    'JSON_SCHEMA_DECLARATION',
    'JSON_SCHEMA_DEFINITIONS_PATH',
    'pascalToTitleCase'
  ]

  testCases.forEach((testCase) => expect(lib).toHaveProperty(testCase))
})
