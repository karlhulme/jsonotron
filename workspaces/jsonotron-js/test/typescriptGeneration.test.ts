import { expect, test } from '@jest/globals'
import fs from 'fs'
import { Jsonotron } from '../src'

function createJsonotron (): Jsonotron {
  const booleanType = fs.readFileSync('./test/testTypes/boolean.yaml', 'utf-8')
  const choreType = fs.readFileSync('./test/testTypes/chore.yaml', 'utf-8')
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const directionType = fs.readFileSync('./test/testTypes/direction.yaml', 'utf-8')
  const geoJsonPolygonType = fs.readFileSync('./test/testTypes/geoJsonPolygon.yaml', 'utf-8')
  const householdType = fs.readFileSync('./test/testTypes/household.yaml', 'utf-8')
  const positiveFloatType = fs.readFileSync('./test/testTypes/positiveFloat.yaml', 'utf-8')
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')
  const registerType = fs.readFileSync('./test/testTypes/register.yaml', 'utf-8')
  const shortStringType = fs.readFileSync('./test/testTypes/shortString.yaml', 'utf-8')
  const stringType = fs.readFileSync('./test/testTypes/string.yaml', 'utf-8')
  const what3WordsType = fs.readFileSync('./test/testTypes/what3words.yaml', 'utf-8')
  
  const jsonotron = new Jsonotron({
    types: [
      booleanType, choreType, colorType, directionType, geoJsonPolygonType, householdType,
      positiveFloatType, positiveIntegerType, registerType, shortStringType, stringType, what3WordsType
    ]
  })

  return jsonotron
}

test('Generate typescript interfaces.', () => {
  const jsonotron = createJsonotron()

  const typescriptInterfaces = jsonotron.getTypescriptInterfaces()
  expect(typescriptInterfaces).toMatch(/export interface Chore_Location {/)
  expect(typescriptInterfaces).toMatch(/export interface Chore {/)
  expect(typescriptInterfaces).toMatch(/associativeArray\?: Record<string, unknown>/)
  expect(typescriptInterfaces).toMatch(/coordinates\?: number\[]\[]/)
  expect(typescriptInterfaces).toMatch(/neighbour\?: Household/)
  expect(typescriptInterfaces).toMatch(/export interface Register {/)
  expect(typescriptInterfaces).toMatch(/capacities\?: Register_Capacities\[]/)
})

test('Generate typescript enums', () => {
  const jsonotron = createJsonotron()

  const typescriptEnums = jsonotron.getTypescriptEnums()
  expect(typescriptEnums).toMatch(/export interface EnumTypeItem/)
  expect(typescriptEnums).toMatch(/const colorItems: EnumTypeItem\[\]/)
})
