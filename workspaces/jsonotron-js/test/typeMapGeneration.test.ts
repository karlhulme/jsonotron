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
  const shortStringType = fs.readFileSync('./test/testTypes/shortString.yaml', 'utf-8')
  const stringType = fs.readFileSync('./test/testTypes/string.yaml', 'utf-8')
  const what3WordsType = fs.readFileSync('./test/testTypes/what3words.yaml', 'utf-8')
  
  const jsonotron = new Jsonotron({
    types: [
      booleanType, choreType, colorType, directionType, geoJsonPolygonType, householdType,
      positiveFloatType,  positiveIntegerType, shortStringType, stringType, what3WordsType
    ]
  })

  return jsonotron
}

test('Convert jsonotron types into a type map.', () => {
  const jsonotron = createJsonotron()

  const map = jsonotron.getTypeMap()

  expect(map.refTypes).toEqual(expect.arrayContaining([
    { name: 'https://jsonotron.org/test/color', refTypeName: 'String', refTypeArrayCount: 0, isScalarRef: true },
    { name: 'https://jsonotron.org/test/chore_priority', refTypeName: 'Int', refTypeArrayCount: 0, isScalarRef: true },
    { name: 'https://jsonotron.org/test/household_familyMemberCount', refTypeName: 'https://jsonotron.org/test/positiveInteger', refTypeArrayCount: 0, isScalarRef: false }
  ]))

  expect(map.objectTypes).toEqual(expect.arrayContaining([
    {
      name: 'https://jsonotron.org/test/chore_location',
      documentation: 'The chore_location type.',
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
})


// test('Resolve types using a GraphQL type map.', () => {
//   const jsonotron = createJsonotron()
//   const map = jsonotron.getGraphQLMap()

//   // a ref to a scalar
//   expect(resolveJsonotronTypeToGraphQLType('https://jsonotron.org/test/chore_location_floor', 0, map, false)).toEqual('Int')

//   // a ref with an array count built in
//   expect(resolveJsonotronTypeToGraphQLType('https://jsonotron.org/test/chore_tools', 0, map, false)).toEqual('[String!]')
  
//   // a ref, that points to another ref
//   expect(resolveJsonotronTypeToGraphQLType('https://jsonotron.org/test/household_doorColor', 0, map, false)).toEqual('String')

//   // a ref where we explicit ask for array indicators
//   expect(resolveJsonotronTypeToGraphQLType('https://jsonotron.org/test/boolean', 2, map, true)).toEqual('[[Boolean!]]')

//   // an object type
//   expect(resolveJsonotronTypeToGraphQLType('https://jsonotron.org/test/household', 0, map, false)).toEqual('Household')

//   // an object type as input
//   expect(resolveJsonotronTypeToGraphQLType('https://jsonotron.org/test/chore_location', 1, map, true)).toEqual('[Chore_LocationInput!]')

//   // an unresolved type
//   expect(resolveJsonotronTypeToGraphQLType('https://jsonotron.org/test/unknown', 1, map, true)).toEqual('Type_Not_Resolved')
// })


// test('A jsonotron can produce the JSON and enum includes.', () => {
//   const jsonotron = new Jsonotron({})
//   const gql = jsonotron.getGraphQLDefsForTypeSystems({ includeEnumTypes: true, includeJsonScalar: true })
//   expect(gql).toContain('scalar JSON')
//   expect(gql).toContain('type EnumType {')
//   expect(gql).toContain('type EnumTypeItem {')
// })

// test('A jsonotron can produce a GraphQL definitions string.', () => {
//   const jsonotron = createJsonotron()

//   const gql = jsonotron.getGraphQLDefsForTypeSystems({})

//   expect(gql).not.toContain('scalar JSON')
//   expect(gql).not.toContain('type EnumType {')
//   expect(gql).not.toContain('type EnumTypeItem {')

//   expect(gql).not.toContain(' StringInput')

//   expect(gql).toContain('type Chore_Location {')
//   expect(gql).toContain('input Chore_LocationInput {')
//   expect(gql).toContain('floor: Int')

//   expect(gql).toContain('type Chore {')
//   expect(gql).toContain('input ChoreInput {')
//   expect(gql).toContain('tools: [String!]')
//   expect(gql).toContain('location: Chore_Location')
//   expect(gql).toContain('associativeArray: JSON')

//   expect(gql).toContain('type GeoJsonPolygon {')
//   expect(gql).toContain('input GeoJsonPolygonInput {')
//   expect(gql).toContain('coordinates: [[Float!]]')

//   expect(gql).toContain('type Household {')
//   expect(gql).toContain('input HouseholdInput {')
//   expect(gql).toContain('location: String!')
//   expect(gql).toContain('doorColor: String!')
//   expect(gql).toContain('neighbour: Household')
// })
