import { expect, test } from '@jest/globals'
import { getTestTypes } from './shared.test'
import { generateTypescript } from '../src'
// import { writeFile } from 'fs/promises' // useful for debug

test('Generate typescript code.', async () => {
  const testTypes = getTestTypes()

  const result = generateTypescript({
    enumTypes: testTypes.enumTypes,
    schemaTypes: testTypes.schemaTypes,
    domain: 'https://testing.org'
  })

  // await writeFile('./test/temp.ts', result) // useful for debug

  // the standard code
  expect(result).toContain('export interface EnumTypeItem {')
  expect(result).toContain('export interface ExtendedEnumTypeItem<T> extends EnumTypeItem {')

  // the json schema outputs
  expect(result).toContain('const colorJsonSchema = {') // enum
  expect(result).toContain('const bedJsonSchema = {') // schema
  expect(result).toContain('const bedPartialJsonSchema = {') // partial schema

  // the interface outputs
  expect(result).toContain('export interface ColorData {') // enum custom data interface
  expect(result).toContain('export interface Bed {') // schema interface
  expect(result).toContain('export interface Drawer_ArrayOfObjects {') // schema property interface

  // the enum values
  expect(result).toContain('sizeValues = {\n  regular: \'regular\',') // definition line
  expect(result).toContain('goingAround: \'goingAround\'') // safe enum item name
  expect(result).toContain('going_up: \'going/up\'') // replace unsafe characters with underscores
  expect(result).toContain('_1red: \'1red\'') // insert underscore prefixes if first character is not alpha

  // the enum items
  expect(result).toContain('export const sizeItems: EnumTypeItem[] = [') // definition line
  expect(result).toContain('{ value: \'xlarge\', text: \'Extra Large\', deprecated: \'Cannot source anymore.\' }') // deprecated
  expect(result).toContain('{ value: \'2green\', text: \'Green\', data: {"hexCode":"0f0"} }') // custom data
  expect(result).toContain('export const colorItems: ExtendedEnumTypeItem<ColorData>[] = [') // custom data strongly typed

  // the enum resolvers
  expect(result).toContain('export const directionResolver = {') // definition line
  expect(result).toContain('REGULAR: \'regular\'') // safe enum item name
  expect(result).toContain('_1: \'1\'') // unsafe initial characters are prefixed
  expect(result).toContain('_1_RED: \'1red\'') // unsafe characters replaced with underscores
  expect(result).toContain('GOING_UP: \'going/up\'') // insert additional underscores to separate words

  // the schema type validators
  expect(result).toContain('export function validateBed (value: unknown): Bed {') // full type
  expect(result).toContain('validateValue(value, \'https://testing.org/test/bed\')')
  expect(result).toContain('return value as Bed')
  expect(result).toContain('export function validatePartialBed (value: unknown): Partial<Bed> {') // partial type
  expect(result).toContain('validateValue(value, \'https://testing.org/test/bedPartial\')')
  expect(result).toContain('return value as Partial<Bed>')
  expect(result).toContain('export function validatePillow') // other types
  expect(result).toContain('export function validateDrawer') // other types
  expect(result).toContain('export function validateTable') // other types
})
