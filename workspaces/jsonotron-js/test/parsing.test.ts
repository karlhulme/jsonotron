import { expect, test } from '@jest/globals'
import fs from 'fs'
import {
  parseResources,
  InvalidEnumTypeError, InvalidSchemaTypeError, ParseYamlError,
  SchemaTypeExampleValidationError, SchemaTypeTestCaseValidationError,
  SchemaTypeTestCaseInvalidationError, UnrecognisedTypeKindError,
  EnumTypeItemDataValidationError, InvalidEnumTypeDataSchemaError
} from '../src'

test('Parsing is successful when given no resource strings.', () => {
  expect(parseResources()).toEqual({
    enumTypes: [],
    schemaTypes: []
  })
})

test('Parsing is successful with valid types.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const directionType = fs.readFileSync('./test/testTypes/direction.yaml', 'utf-8')
  const householdType = fs.readFileSync('./test/testTypes/household.yaml', 'utf-8')
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')
  const stringType = fs.readFileSync('./test/testTypes/string.yaml', 'utf-8')

  const resources = parseResources({
    resourceStrings: [
      colorType, directionType, householdType,
      positiveIntegerType, stringType
    ],
    jsonSchemaFormatValidators: {
      testFormatFunc: v => v.length > 5
    }
  })

  expect(resources.enumTypes).toHaveLength(2)
  expect(resources.schemaTypes).toHaveLength(3)
})

test('Parsing will fail when given a malformed type string.', () => {
  try {
    parseResources({ resourceStrings: ['!!@@not YAML@@!!'] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(ParseYamlError)
  }
})

test('Parsing will fail for an invalid enum type.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')

  try {
    parseResources({ resourceStrings: [colorType.replace('text: Purple', 'missing: property')] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidEnumTypeError)
    expect(err.enumTypeName).toEqual('color')
  }
})

test('Parsing will fail when given an enum type with an invalid (i.e. non-object) data json schema.', () => {
  const directionMalformedSchemaType = fs.readFileSync('./test/testTypes/directionMalformedSchema.yaml', 'utf-8')

  try {
    parseResources({ resourceStrings: [directionMalformedSchemaType] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidEnumTypeError)
    expect(err.enumTypeName).toEqual('direction')
  }
})

test('Parsing will fail when given an enum type with a data jaon schema that does not compile.', () => {
  const directionUncompileableSchemaType = fs.readFileSync('./test/testTypes/directionUncompileableSchema.yaml', 'utf-8')

  try {
    parseResources({ resourceStrings: [directionUncompileableSchemaType] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidEnumTypeDataSchemaError)
    expect(err.enumTypeName).toEqual('direction')
  }
})

test('Parsing will fail when given an enum type with an item that fails data validation.', () => {
  const directionMalformedDataType = fs.readFileSync('./test/testTypes/directionMalformedData.yaml', 'utf-8')

  try {
    parseResources({ resourceStrings: [directionMalformedDataType] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(EnumTypeItemDataValidationError)
    expect(err.enumTypeName).toEqual('direction')
    expect(err.itemValue).toEqual('UP')
  }
})

test('Parsing will fail when given an invalid schema type.', () => {
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')

  try {
    parseResources({ resourceStrings: [positiveIntegerType.replace('invalidTestCases:', 'unknownPropertyName:')] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidSchemaTypeError)
    expect(err.schemaTypeName).toEqual('positiveInteger')
  }
})

test('Parsing will fail when given a schema type with an example that does not validate.', () => {
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')
  const sample = positiveIntegerType.replace('- value: 7', '- value: will not validate')

  try {
    parseResources({ resourceStrings: [sample] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(SchemaTypeExampleValidationError)
    expect(err.schemaTypeName).toEqual('positiveInteger')
    expect(err.exampleIndex).toEqual(0)
  }
})

test('Parsing will fail when given a schema type with a test case that does not validate.', () => {
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')

  try {
    parseResources({ resourceStrings: [positiveIntegerType.replace('- 25', '- will not validate')] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(SchemaTypeTestCaseValidationError)
    expect(err.schemaTypeName).toEqual('positiveInteger')
    expect(err.testCaseIndex).toEqual(1)
  }
})

test('Parsing will fail when given a schema type with an *invalid* test cases that actually passes validation.', () => {
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')

  try {
    parseResources({ resourceStrings: [positiveIntegerType.replace('- a string', '- 901')] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(SchemaTypeTestCaseInvalidationError)
    expect(err.schemaTypeName).toEqual('positiveInteger')
    expect(err.testCaseIndex).toEqual(0)
  }
})

test('Parsing will fail if a resource has an unrecognised kind. property', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')

  try {
    parseResources({ resourceStrings: [colorType.replace('kind: enum', 'kind: invalid')] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(UnrecognisedTypeKindError)
    expect(err.kind).toEqual('invalid')
  }
})
