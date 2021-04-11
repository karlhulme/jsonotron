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
  expect(result).toContain('export interface ExtendedEnumTypeItem<T> extends EnumTypeItem {')

  // the system-centric wrappers
  expect(result).toContain('export const TEST = {')
  expect(result).toContain('export const ALT = {')

  // the type name consts
  expect(result).toContain('color: \'test/color\'')

  // the enum values
  expect(result).toContain('TEST_SIZE_VALUES = {\n  regular: \'regular\',')
  expect(result).toContain('{ value: \'xlarge\', text: \'Extra Large\', deprecated: \'Cannot source anymore.\' }')
  expect(result).toContain('going_up: \'going/up\'')
  expect(result).toContain('goingAround: \'goingAround\'')
  expect(result).toContain('_1red: \'1red\'')

  // the object-type interfaces
  expect(result).toContain('export interface TestBed {')
  expect(result).toContain('export interface TestPillow {')
})
