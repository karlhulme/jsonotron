import { expect, test } from '@jest/globals'
import fs from 'fs'
import { Jsonotron } from '../src'

function createJsonotron (): Jsonotron {
  const booleanType = fs.readFileSync('./test/testTypes/boolean.yaml', 'utf-8')
  const choreType = fs.readFileSync('./test/testTypes/chore.yaml', 'utf-8')
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const positiveFloatType = fs.readFileSync('./test/testTypes/positiveFloat.yaml', 'utf-8')
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')
  const shortStringType = fs.readFileSync('./test/testTypes/shortString.yaml', 'utf-8')
  
  const jsonotron = new Jsonotron({
    types: [
      booleanType, choreType, colorType,
      positiveFloatType,  positiveIntegerType, shortStringType
    ]
  })

  return jsonotron
}

test('Convert enum types into graph ql primitives.', () => {
  const jsonotron = createJsonotron()
  expect(jsonotron.getGraphQLPrimitiveType({ typeName: 'https://jsonotron.org/test/color' })).toEqual('String')
  expect(jsonotron.getGraphQLPrimitiveType({ typeName: 'color' })).toEqual('String')
  expect(jsonotron.getGraphQLPrimitiveType({ typeName: 'color', isRequired: true })).toEqual('String!')
  expect(jsonotron.getGraphQLPrimitiveType({ typeName: 'color', isArray: true })).toEqual('[String!]')
  expect(jsonotron.getGraphQLPrimitiveType({ typeName: 'color', isArray: true, isRequired: true })).toEqual('[String!]!')
})

test('Convert schema types into graph ql primitives.', () => {
  const jsonotron = createJsonotron()
  expect(jsonotron.getGraphQLPrimitiveType({ typeName: 'https://jsonotron.org/test/boolean' })).toEqual('Boolean')
  expect(jsonotron.getGraphQLPrimitiveType({ typeName: 'boolean' })).toEqual('Boolean')
  expect(jsonotron.getGraphQLPrimitiveType({ typeName: 'positiveFloat' })).toEqual('Float')
  expect(jsonotron.getGraphQLPrimitiveType({ typeName: 'positiveInteger' })).toEqual('Int')
  expect(jsonotron.getGraphQLPrimitiveType({ typeName: 'shortString' })).toEqual('String')
  expect(jsonotron.getGraphQLPrimitiveType({ typeName: 'chore' })).toEqual('JSON')

  expect(jsonotron.getGraphQLPrimitiveType({ typeName: 'boolean', isRequired: true })).toEqual('Boolean!')
  expect(jsonotron.getGraphQLPrimitiveType({ typeName: 'boolean', isArray: true })).toEqual('[Boolean!]')
  expect(jsonotron.getGraphQLPrimitiveType({ typeName: 'boolean', isRequired: true, isArray: true })).toEqual('[Boolean!]!')
})

test('Fail to convert unknown types into graph ql primitives.', () => {
  const jsonotron = createJsonotron()
  expect(() => jsonotron.getGraphQLPrimitiveType({ typeName: 'madeup' })).toThrow()
  expect(() => jsonotron.getGraphQLPrimitiveType({ typeName: 'example.com/sys/madeup' })).toThrow()
})

test('Get the graph ql definition for enum types.', () => {
  const jsonotron = createJsonotron()
  expect(jsonotron.getGraphQLEnumType()).toEqual(expect.any(String))
})
