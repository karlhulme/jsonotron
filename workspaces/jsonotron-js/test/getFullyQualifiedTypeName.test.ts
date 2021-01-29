import { expect, test } from '@jest/globals'
import fs from 'fs'
import { Jsonotron, UnrecognisedTypeNameError } from '../src'

test('A jsonotron can resolve short names into fully qualified type names.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const householdType = fs.readFileSync('./test/testTypes/household.yaml', 'utf-8')
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')
  const stringType = fs.readFileSync('./test/testTypes/string.yaml', 'utf-8')

  const jsonotron = new Jsonotron({
    types: [colorType, householdType, positiveIntegerType, stringType],
  })

  expect(jsonotron.getFullyQualifiedTypeName('color')).toEqual('https://jsonotron.org/test/color')
  expect(jsonotron.getFullyQualifiedTypeName('household')).toEqual('https://jsonotron.org/test/household')
})

test('A jsonotron cannot resolve unrecognised short names.', () => {
  const jsonotron = new Jsonotron({})

  try {
    jsonotron.getFullyQualifiedTypeName('unknown')
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(UnrecognisedTypeNameError)
  }
})

test('A jsonotron will return fully qualified type names.', () => {
  const jsonotron = new Jsonotron({})
  expect(jsonotron.getFullyQualifiedTypeName('https://example.com/system/unknown')).toEqual('https://example.com/system/unknown')
})
