import { expect, test } from '@jest/globals'
import { getTestTypes } from './shared.test'
import { generateGraphQL } from '../src'

test('Generate Graph QL code for enum types and schema types.', async () => {
  const testTypes = getTestTypes()
  const result = generateGraphQL({
    enumTypes: testTypes.enumTypes,
    schemaTypes: testTypes.schemaTypes
  })

  // useful for debug
  // console.log(result)

  // the enum type item declarations
  expect(result).toContain('type EnumTypeItem {')
  expect(result).toContain('type ColorEnumTypeItem {')
  expect(result).toContain('data: ColorData!')

  // the enum constants
  expect(result).toContain('enum Color {')
  expect(result).toContain('  _1_RED')
  expect(result).toContain('  _2_GREEN')
  expect(result).toContain('enum Size {')
  expect(result).toContain('enum Direction {')
  expect(result).toContain('  GOING_UP')
  expect(result).toContain('  GOING_DOWN')
  expect(result).toContain('  GOING_AROUND')

  // the object-type interfaces
  expect(result).toContain('type ColorData {')
  expect(result).toContain('  hexCode: String!')
  expect(result).toContain('  isWarningColor: Boolean')
  expect(result).toContain('type Bed {')
  expect(result).toContain('  direction: Direction')
  expect(result).toContain('type Pillow {')
  expect(result).toContain('  make: String!')
  expect(result).toContain('type Drawer {')
  expect(result).toContain('  arrayOfStrings: [String]')
  expect(result).toContain('  arrayOfObjects: [Drawer_ArrayOfObjects]')

  // the object-type inputs
  expect(result).toContain('input ColorData_Input {')
  expect(result).toContain('input Bed_Input {')
  expect(result).toContain('input Pillow_Input {')
  expect(result).toContain('input Drawer_Input {')
})
