import { expect, test } from '@jest/globals'
import { readFile} from 'fs/promises'
import {
  parseResources,
  InvalidEnumTypeError, InvalidSchemaTypeError, ParseYamlError,
  SchemaTypeExampleValidationError, SchemaTypeTestCaseValidationError,
  SchemaTypeTestCaseInvalidationError, UnrecognisedTypeKindError,
  EnumTypeItemDataValidationError, InvalidEnumTypeDataSchemaError,
  SchemaTypeVariantsNotExpectedError, SchemaTypeVariantUnrecognisedFieldError
} from '../src'

test('Parsing is successful when given no resource strings.', () => {
  expect(parseResources()).toEqual({
    enumTypes: [],
    schemaTypes: []
  })
})

test('Parsing is successful with valid types.', async () => {
  const colorType = await readFile('./test/testTypes/color.yaml', 'utf-8')
  const directionType = await readFile('./test/testTypes/direction.yaml', 'utf-8')
  const householdType = await readFile('./test/testTypes/household.yaml', 'utf-8')
  const positiveIntegerType = await readFile('./test/testTypes/positiveInteger.yaml', 'utf-8')
  const stringType = await readFile('./test/testTypes/string.yaml', 'utf-8')

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

test('Parsing will fail for an invalid enum type.', async () => {
  const colorType = await readFile('./test/testTypes/color.yaml', 'utf-8')

  try {
    parseResources({ resourceStrings: [colorType.replace('text: Purple', 'missing: property')] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidEnumTypeError)
    expect(err.enumTypeName).toEqual('color')
  }
})

test('Parsing will fail when given an enum type with an invalid (i.e. non-object) data json schema.', async () => {
  const directionMalformedSchemaType = await readFile('./test/testTypes/directionMalformedSchema.yaml', 'utf-8')

  try {
    parseResources({ resourceStrings: [directionMalformedSchemaType] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidEnumTypeError)
    expect(err.enumTypeName).toEqual('direction')
  }
})

test('Parsing will fail when given an enum type with a data jaon schema that does not compile.', async () => {
  const directionUncompileableSchemaType = await readFile('./test/testTypes/directionUncompileableSchema.yaml', 'utf-8')

  try {
    parseResources({ resourceStrings: [directionUncompileableSchemaType] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidEnumTypeDataSchemaError)
    expect(err.enumTypeName).toEqual('direction')
  }
})

test('Parsing will fail when given an enum type with an item that fails data validation.', async () => {
  const directionMalformedDataType = await readFile('./test/testTypes/directionMalformedData.yaml', 'utf-8')

  try {
    parseResources({ resourceStrings: [directionMalformedDataType] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(EnumTypeItemDataValidationError)
    expect(err.enumTypeName).toEqual('direction')
    expect(err.itemValue).toEqual('UP')
  }
})

test('Parsing will fail when given an invalid schema type.', async () => {
  const positiveIntegerType = await readFile('./test/testTypes/positiveInteger.yaml', 'utf-8')

  try {
    parseResources({ resourceStrings: [positiveIntegerType.replace('invalidTestCases:', 'unknownPropertyName:')] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidSchemaTypeError)
    expect(err.schemaTypeName).toEqual('positiveInteger')
  }
})

test('Parsing will fail when given a schema type with an example that does not validate.', async () => {
  const positiveIntegerType = await readFile('./test/testTypes/positiveInteger.yaml', 'utf-8')
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

test('Parsing will fail when given a schema type with a test case that does not validate.', async () => {
  const positiveIntegerType = await readFile('./test/testTypes/positiveInteger.yaml', 'utf-8')

  try {
    parseResources({ resourceStrings: [positiveIntegerType.replace('- 25', '- will not validate')] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(SchemaTypeTestCaseValidationError)
    expect(err.schemaTypeName).toEqual('positiveInteger')
    expect(err.testCaseIndex).toEqual(1)
  }
})

test('Parsing will fail when given a schema type with an *invalid* test case that actually passes validation.', async () => {
  const positiveIntegerType = await readFile('./test/testTypes/positiveInteger.yaml', 'utf-8')

  try {
    parseResources({ resourceStrings: [positiveIntegerType.replace('- a string', '- 901')] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(SchemaTypeTestCaseInvalidationError)
    expect(err.schemaTypeName).toEqual('positiveInteger')
    expect(err.testCaseIndex).toEqual(0)
  }
})

test('Parsing will fail when given a non-object schema type includes variants.', async () => {
  const positiveIntegerUnexpectedVariantType = await readFile('./test/testTypes/positiveIntegerUnexpectedVariant.yaml', 'utf-8')

  try {
    parseResources({ resourceStrings: [positiveIntegerUnexpectedVariantType] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(SchemaTypeVariantsNotExpectedError)
    expect(err.schemaTypeName).toEqual('positiveIntegerUnexpectedYaml')
    expect(err.jsonSchemaType).toEqual('integer')
  }
})

test('Parsing will fail when given a schema type variant that includes unrecognised include fields.', async () => {
  const hobbyType = await readFile('./test/testTypes/hobby.yaml', 'utf-8')

  try {
    parseResources({ resourceStrings: [hobbyType.replace('- rules', '- unknownIncludeField')] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(SchemaTypeVariantUnrecognisedFieldError)
    expect(err.schemaTypeName).toEqual('hobby')
    expect(err.variantName).toEqual('variantA')
    expect(err.fieldName).toEqual('unknownIncludeField')
  }
})

test('Parsing will fail when given a schema type variant that includes unrecognised exclude fields.', async () => {
  const hobbyType = await readFile('./test/testTypes/hobby.yaml', 'utf-8')

  try {
    parseResources({ resourceStrings: [hobbyType.replace('- inventor', '- unknownExcludeField')] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(SchemaTypeVariantUnrecognisedFieldError)
    expect(err.schemaTypeName).toEqual('hobby')
    expect(err.variantName).toEqual('variantB')
    expect(err.fieldName).toEqual('unknownExcludeField')
  }
})

test('Parsing will fail if a resource has an unrecognised kind. property', async () => {
  const colorType = await readFile('./test/testTypes/color.yaml', 'utf-8')

  try {
    parseResources({ resourceStrings: [colorType.replace('kind: enum', 'kind: invalid')] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(UnrecognisedTypeKindError)
    expect(err.kind).toEqual('invalid')
  }
})
