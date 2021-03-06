import { expect, test } from '@jest/globals'
import fs from 'fs'
import { InvalidEnumTypeError, InvalidSchemaTypeError, Jsonotron, ParseYamlError,
  SchemaTypeExampleValidationError, SchemaTypeTestCaseValidationError,
  SchemaTypeTestCaseInvalidationError, UnrecognisedTypeKindError } from '../src'

test('The jsonotron constructor works with no properties.', () => {
  expect(() => new Jsonotron()).not.toThrow()
})

test('The jsonotron constructor works with valid types.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const householdType = fs.readFileSync('./test/testTypes/household.yaml', 'utf-8')
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')
  const stringType = fs.readFileSync('./test/testTypes/string.yaml', 'utf-8')

  expect(() => new Jsonotron({
    types: [colorType, householdType, positiveIntegerType, stringType],
    jsonSchemaFormatValidators: {
      testFormatFunc: v => v.length > 5
    }
  })).not.toThrow()
})

test('The jsonotron constructor does not accept malformed type strings.', () => {
  try {
    new Jsonotron({ types: ['!!@@not YAML@@!!'] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(ParseYamlError)
  }
})

test('The jsonotron constructor does not accept invalid enum types.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')

  try {
    new Jsonotron({ types: [colorType.replace('text: Purple', 'missing: property')] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidEnumTypeError)
    expect(err.enumTypeName).toEqual('color')
  }
})

test('The jsonotron constructor does not accept invalid schema types.', () => {
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')

  try {
    new Jsonotron({ types: [positiveIntegerType.replace('title: Positive Integer', 'missing: property')] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidSchemaTypeError)
    expect(err.schemaTypeName).toEqual('positiveInteger')
  }
})

test('The jsonotron constructor does not accept schema types with examples that fail validation.', () => {
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')
  const sample = positiveIntegerType.replace('- value: 7', '- value: will not validate')

  try {
    new Jsonotron({ types: [sample] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(SchemaTypeExampleValidationError)
    expect(err.schemaTypeName).toEqual('positiveInteger')
    expect(err.exampleIndex).toEqual(0)
  }
})

test('The jsonotron constructor does not accept schema types with test cases that fail validation.', () => {
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')

  try {
    new Jsonotron({ types: [positiveIntegerType.replace('- 25', '- will not validate')] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(SchemaTypeTestCaseValidationError)
    expect(err.schemaTypeName).toEqual('positiveInteger')
    expect(err.testCaseIndex).toEqual(1)
  }
})

test('The jsonotron constructor does not accept schema types with invalid test cases that actually pass validation.', () => {
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')

  try {
    new Jsonotron({ types: [positiveIntegerType.replace('- a string', '- 901')] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(SchemaTypeTestCaseInvalidationError)
    expect(err.schemaTypeName).toEqual('positiveInteger')
    expect(err.testCaseIndex).toEqual(0)
  }
})

test('The jsonotron constructor does not accept unrecognised type kinds.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')

  try {
    new Jsonotron({ types: [colorType.replace('kind: enum', 'kind: invalid')] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(UnrecognisedTypeKindError)
    expect(err.kind).toEqual('invalid')
  }
})