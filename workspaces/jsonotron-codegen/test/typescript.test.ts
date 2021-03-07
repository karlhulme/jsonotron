import { expect, test } from '@jest/globals'
import { getTestTypes } from './shared.test'
import { TypescriptCodeGenerator } from '../src'

test('Generate typescript code.', async () => {
  const testTypes = getTestTypes()
  const generator = new TypescriptCodeGenerator()
  const result = generator.generate({
    enumTypes: testTypes.enumTypes,
    schemaTypes: testTypes.schemaTypes
  })

  // useful for debug
  // console.log(result)

  // the standard outputs
  expect(result).toContain('export interface EnumTypeItem {')

  // the system-centric wrappers
  expect(result).toContain('export const test = {')
  expect(result).toContain('export const alt = {')

  // the type name consts
  expect(result).toContain('color: \'https://jsonotron.org/test/color\'')

  // the enum values
  expect(result).toContain('sizeValues: {\n    regular: \'regular\',')
  expect(result).toContain('{ value: \'xlarge\', text: \'Extra Large\', deprecated: \'Cannot source anymore.\' }')

  // the object-type interfaces
  expect(result).toContain('export interface Bed {')
  expect(result).toContain('export interface Pillow {')
})
