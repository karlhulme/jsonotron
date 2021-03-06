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
      positiveFloatType,  positiveIntegerType, registerType, shortStringType, stringType, what3WordsType
    ]
  })

  return jsonotron
}

test('Convert jsonotron types into a type map.', () => {
  const jsonotron = createJsonotron()

  const map = jsonotron.getTypeMap()

  // output the map - useful when debugging
  // console.log(JSON.stringify(map, null, 2))

  expect(map.refTypes).toEqual(expect.arrayContaining([
    { name: 'https://jsonotron.org/test/color', refTypeName: 'string', refTypeArrayCount: 0, isScalarRef: true },
    { name: 'https://jsonotron.org/test/chore_priority', refTypeName: 'integer', refTypeArrayCount: 0, isScalarRef: true },
    { name: 'https://jsonotron.org/test/household_familyMemberCount', refTypeName: 'https://jsonotron.org/test/positiveInteger', refTypeArrayCount: 0, isScalarRef: false }
  ]))

  expect(map.objectTypes).toEqual(expect.arrayContaining([
    {
      name: 'https://jsonotron.org/test/chore_location',
      documentation: 'The chore_location type.',
      objectTypeArrayCount: 0,
      properties: [
        {
          propertyName: 'floor',
          documentation: '',
          refTypeName: 'https://jsonotron.org/test/chore_location_floor',
          isRequired: false
        },
        {
          propertyName: 'x',
          documentation: '',
          refTypeName: 'https://jsonotron.org/test/chore_location_x',
          isRequired: false
        },
        {
          propertyName: 'y',
          documentation: '',
          refTypeName: 'https://jsonotron.org/test/chore_location_y',
          isRequired: false
        }
      ]
    }
  ]))

  expect(map.objectTypes).toEqual(expect.arrayContaining([
    {
      name: "https://jsonotron.org/test/register_capacities",
      documentation: "The register_capacities type.",
      objectTypeArrayCount: 1,
      properties: expect.any(Array)
    }
  ]))
})
