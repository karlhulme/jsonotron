import { expect, test } from '@jest/globals'
import { getTestTypes } from './shared.test'
import { GraphQLCodeGenerator } from '../src'

test('Generate graph ql code for enum type item declarations.', async () => {
  const testTypes = getTestTypes()
  const generator = new GraphQLCodeGenerator()
  const result = generator.generate({
    enumTypes: testTypes.enumTypes,
    schemaTypes: testTypes.schemaTypes
  })

  // useful for debug
  // console.log(result)

  // the enum type item declarations
  expect(result).toContain('type EnumTypeItem {')
  expect(result).toContain('type ColorEnumTypeItem {')
  expect(result).toContain('data: Color_Data!')

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
  expect(result).toContain('type Color_Data {')
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
  expect(result).toContain('input Color_Data_Input {')
  expect(result).toContain('input Bed_Input {')
  expect(result).toContain('input Pillow_Input {')
  expect(result).toContain('input Drawer_Input {')
})
