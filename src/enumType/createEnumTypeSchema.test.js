/* eslint-env jest */
import Ajv from 'ajv'
import { createEnumTypeSchema } from './createEnumTypeSchema'

test('An enumType schema can be created and compiled.', () => {
  const ajv = new Ajv()
  const schema = createEnumTypeSchema()
  expect(schema.properties.paragraphs.minItems).toEqual(0)
  expect(ajv.compile(schema)).toBeInstanceOf(Function)
})

test('An enumType schema with documentation can be created and compiled.', () => {
  const ajv = new Ajv()
  const schema = createEnumTypeSchema({ includeDocs: true })
  expect(schema.properties.paragraphs.minItems).toEqual(1)
  expect(ajv.compile(schema)).toBeInstanceOf(Function)
})
