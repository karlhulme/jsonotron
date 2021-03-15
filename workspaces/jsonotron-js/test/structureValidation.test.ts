import { expect, test } from '@jest/globals'
import fs from 'fs'
import { Jsonotron, StructureNotFoundError, StructureValidationError } from '../src'

test('Valid structure containing values and value arrays can be validated.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const householdType = fs.readFileSync('./test/testTypes/household.yaml', 'utf-8')
  const positiveIntegerType = fs.readFileSync('./test/testTypes/positiveInteger.yaml', 'utf-8')
  const stringType = fs.readFileSync('./test/testTypes/string.yaml', 'utf-8')

  const jsonotron = new Jsonotron({ resources: [colorType, householdType, positiveIntegerType, stringType] })

  expect(jsonotron.validateStructure({
    favourite: { type: 'https://jsonotron.org/test/color', isRequired: true },
    familyUnit: { type: 'https://jsonotron.org/test/household', isNullable: true },
    steps: { type: 'https://jsonotron.org/test/positiveInteger', isArray: true }
  }, {
    favourite: 'BLUE',
    familyUnit: { location: 'here', familyMemberCount: 3, doorColor: 'GREEN' },
    steps: [39, 40]
  })).toEqual({ validated: true, fields: [] })
})

test('An object can be validated against a pre-loaded structure.', () => {
  const stringType = fs.readFileSync('./test/testTypes/string.yaml', 'utf-8')
  const paintingStructure = fs.readFileSync('./test/testStructures/painting.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ resources: [stringType, paintingStructure] })
  expect(() => jsonotron.ensureStructure('painting', { artist: 'Da Vinci' })).not.toThrow()
})

test('Structure with invalid field value cannot be validated.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ resources: [colorType] })
  expect(jsonotron.validateStructure({
    favourite: { type: 'https://jsonotron.org/test/color' }
  }, { favourite: 'madeup' })).toEqual({ validated: false, fields: [{ name: 'favourite', message: expect.stringContaining('one of the allowed values') }] })
})

test('Structure with missing optional field can be validated.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ resources: [colorType] })
  expect(jsonotron.validateStructure({
    favourite: { type: 'https://jsonotron.org/test/color' }
  }, {})).toEqual({ validated: true, fields: [] })
})

test('Structure with missing required field cannot be validated.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ resources: [colorType] })
  expect(jsonotron.validateStructure({
    favourite: { type: 'https://jsonotron.org/test/color', isRequired: true }
  }, {})).toEqual({ validated: false, fields: [{ name: 'favourite', message: expect.stringContaining('is required') }] })
})

test('Structure with null on a nullable field can be validated.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ resources: [colorType] })
  expect(jsonotron.validateStructure({
    favourite: { type: 'https://jsonotron.org/test/color', isNullable: true }
  }, { favourite: null })).toEqual({ validated: true, fields: [] })
})

test('Structure with null on a non-nullable field cannot be validated.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ resources: [colorType] })
  expect(jsonotron.validateStructure({
    favourite: { type: 'https://jsonotron.org/test/color' }
  }, { favourite: null })).toEqual({ validated: false, fields: [{ name: 'favourite', message: expect.stringContaining('is not nullable') }] })
})

test('Structure with unknown field type cannot be validated.', () => {
  const colorType = fs.readFileSync('./test/testTypes/color.yaml', 'utf-8')
  const jsonotron = new Jsonotron({ resources: [colorType] })
  expect(jsonotron.validateStructure({
    favourite: { type: 'https://jsonotron.org/test/invalid' }
  }, { favourite: 'RED' })).toEqual({ validated: false, fields: [{ name: 'favourite', message: expect.stringContaining('Unrecognised type') }] })
})

test('An object cannot be validated against an unrecognised pre-loaded structure.', () => {
  const jsonotron = new Jsonotron({})

  try {
    jsonotron.ensureStructure('painting', { artist: 'Da Vinci' })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(StructureNotFoundError)
    expect(err.structureName).toEqual('painting')
  }
})


test('An invalid object will fail to validate against a pre-loaded structure.', () => {
  const stringType = fs.readFileSync('./test/testTypes/string.yaml', 'utf-8')
  const paintingStructure = fs.readFileSync('./test/testStructures/painting.yaml', 'utf-8')

  const jsonotron = new Jsonotron({ resources: [stringType, paintingStructure] })

  try {
    jsonotron.ensureStructure('painting', { artist: 123 })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(StructureValidationError)
    expect(err.structureName).toEqual('painting')
    expect(err.validationResult).toHaveProperty('validated', false)
    expect(JSON.stringify(err.validationResult.fields)).toContain('should be string')
  }
})
