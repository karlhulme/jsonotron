import { expect, test } from '@jest/globals'
import fs from 'fs'
import { Jsonotron } from '../src'

test('Valid structure containing values and value arrays can be validated.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const householdType = fs.readFileSync('./test/testTypes/household.yaml', 'utf-8')
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')
  const stringType = fs.readFileSync('./test/testTypes/string.yaml', 'utf-8')

  const jsonotron = new Jsonotron({ types: [colorType, householdType, positiveIntegerType, stringType] })

  expect(jsonotron.validateStructure({
    favourite: { type: 'https://jsonotron.org/test/color', isRequired: true },
    familyUnit: { type: 'https://jsonotron.org/test/household', isNullable: true },
    steps: { type: 'https://jsonotron.org/test/positiveInteger', isArray: true }
  }, {
    favourite: 'blue',
    familyUnit: { location: 'here', familyMemberCount: 3, doorColor: 'green' },
    steps: [39, 40]
  })).toEqual({ validated: true, fields: [] })
})

test('Structure with invalid field value cannot be validated.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ types: [colorType] })
  expect(jsonotron.validateStructure({
    favourite: { type: 'https://jsonotron.org/test/color' }
  }, { favourite: 'madeup' })).toEqual({ validated: false, fields: [{ name: 'favourite', message: expect.stringContaining('one of the allowed values') }] })
})

test('Structure with missing optional field can be validated.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ types: [colorType] })
  expect(jsonotron.validateStructure({
    favourite: { type: 'https://jsonotron.org/test/color' }
  }, {})).toEqual({ validated: true, fields: [] })
})

test('Structure with missing required field cannot be validated.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ types: [colorType] })
  expect(jsonotron.validateStructure({
    favourite: { type: 'https://jsonotron.org/test/color', isRequired: true }
  }, {})).toEqual({ validated: false, fields: [{ name: 'favourite', message: expect.stringContaining('is required') }] })
})

test('Structure with null on a nullable field can be validated.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ types: [colorType] })
  expect(jsonotron.validateStructure({
    favourite: { type: 'https://jsonotron.org/test/color', isNullable: true }
  }, { favourite: null })).toEqual({ validated: true, fields: [] })
})

test('Structure with null on a non-nullable field cannot be validated.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ types: [colorType] })
  expect(jsonotron.validateStructure({
    favourite: { type: 'https://jsonotron.org/test/color' }
  }, { favourite: null })).toEqual({ validated: false, fields: [{ name: 'favourite', message: expect.stringContaining('is not nullable') }] })
})

test('Structure with unknown field type cannot be validated.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ types: [colorType] })
  expect(jsonotron.validateStructure({
    favourite: { type: 'https://jsonotron.org/test/invalid' }
  }, { favourite: 'red' })).toEqual({ validated: false, fields: [{ name: 'favourite', message: expect.stringContaining('Unrecognised type') }] })
})
