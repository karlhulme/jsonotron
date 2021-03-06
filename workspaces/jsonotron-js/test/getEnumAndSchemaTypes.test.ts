import { expect, test } from '@jest/globals'
import fs from 'fs'
import { Jsonotron } from '../src'

function createJsonotron () {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const householdType = fs.readFileSync('./test/testTypes/household.yaml', 'utf-8')
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')
  const stringType = fs.readFileSync('./test/testTypes/string.yaml', 'utf-8')

  const jsonotron = new Jsonotron({
    types: [colorType, householdType, positiveIntegerType, stringType]
  })

  return jsonotron
}

test('The jsonotron can return clones of the enum and schema types.', () => {
  const jsonotron = createJsonotron()

  expect(jsonotron.getEnumTypes(['https://jsonotron.org/test']).length).toEqual(1)
  expect(jsonotron.getSchemaTypes(['https://jsonotron.org/test', 'https://jsonotron.org/extra']).length).toEqual(3)
})

test('The jsonotron will return empty arrays if the requested systems are not found.', () => {
  const jsonotron = createJsonotron()

  expect(jsonotron.getEnumTypes(['https://jsonotron.org/unknown']).length).toEqual(0)
  expect(jsonotron.getSchemaTypes(['https://jsonotron.org/unknown']).length).toEqual(0)

  expect(jsonotron.getEnumTypes().length).toEqual(0)
  expect(jsonotron.getSchemaTypes().length).toEqual(0)
})
