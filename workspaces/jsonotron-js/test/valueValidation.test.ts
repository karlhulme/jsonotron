import { expect, test } from '@jest/globals'
import fs from 'fs'
import { Jsonotron } from '../src'

test('Unknown enum/schema type is not resolved using short name.', () => {
  const jsonotron = new Jsonotron({})
  expect(jsonotron.validateValue('madeup', 'madeup')).toEqual({ resolved: false, validated: false, message: expect.stringContaining('Ambiguous or unrecognised type') })
})

test('Unknown enum/schema type is not resolved using fully qualified name.', () => {
  const jsonotron = new Jsonotron({})
  expect(jsonotron.validateValue('https://jsonotron.org/test/madeup', 'madeup')).toEqual({ resolved: false, validated: false, message: expect.stringContaining('Unrecognised type.') })
})

test('Valid enum value can be validated using short or qualified name.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ types: [colorType] })
  expect(jsonotron.validateValue('color', 'red')).toEqual({ resolved: true, validated: true })
  expect(jsonotron.validateValue('https://jsonotron.org/test/color', 'red')).toEqual({ resolved: true, validated: true })
})

test('Valid enum value array can be validated.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ types: [colorType] })
  expect(jsonotron.validateValueArray('color', [])).toEqual({ resolved: true, validated: true })
  expect(jsonotron.validateValueArray('color', ['red'])).toEqual({ resolved: true, validated: true })
  expect(jsonotron.validateValueArray('color', ['blue', 'yellow'])).toEqual({ resolved: true, validated: true })
})

test('Invalid enum value cannot be validated.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ types: [colorType] })
  expect(jsonotron.validateValue('color', 'puse')).toEqual({ resolved: true, validated: false, message: expect.any(String) })
})

test('Valid schema value can be validated using short or qualified name.', () => {
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ types: [positiveIntegerType] })
  expect(jsonotron.validateValue('positiveInteger', 25)).toEqual({ resolved: true, validated: true })
  expect(jsonotron.validateValue('https://jsonotron.org/test/positiveInteger', 25)).toEqual({ resolved: true, validated: true })
})

test('Valid schema value that references other schemas can be validated.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const householdType = fs.readFileSync('./test/testTypes/household.yaml', 'utf-8')
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')
  const stringType = fs.readFileSync('./test/testTypes/string.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ types: [colorType, householdType, positiveIntegerType, stringType] })
  expect(jsonotron.validateValue('household', { location: 'here', familyMemberCount: 2, doorColor: 'green' })).toEqual({ resolved: true, validated: true })
})

test('Valid schema value array can be validated.', () => {
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ types: [positiveIntegerType] })
  expect(jsonotron.validateValueArray('positiveInteger', [])).toEqual({ resolved: true, validated: true })
  expect(jsonotron.validateValueArray('positiveInteger', [1])).toEqual({ resolved: true, validated: true })
  expect(jsonotron.validateValueArray('positiveInteger', [1, 2, 3, 4])).toEqual({ resolved: true, validated: true })
})

test('Invalid schema value cannot be validated.', () => {
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ types: [positiveIntegerType] })
  expect(jsonotron.validateValue('positiveInteger', 'invalid')).toEqual({ resolved: true, validated: false, message: expect.any(String) })
})
