import { expect, test } from '@jest/globals'
import * as lib from '../src/index.js'

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
    'pascalToTitleCase',

    // core types
    'coreEnumTypes',
    'coreSchemaTypes'
  ]

  testCases.forEach((testCase) => expect(lib).toHaveProperty(testCase))
})
