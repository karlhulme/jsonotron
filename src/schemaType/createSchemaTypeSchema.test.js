/* eslint-env jest */
import Ajv from 'ajv'
import { createSchemaTypeSchema } from './createSchemaTypeSchema'

test('A schemaType schema can be created and compiled.', () => {
  const ajv = new Ajv()
  const schema = createSchemaTypeSchema()
  expect(schema.properties.paragraphs.minItems).toEqual(0)
  expect(ajv.compile(schema)).toBeInstanceOf(Function)
})

test('A schemaType schema with documentation can be created and compiled.', () => {
  const ajv = new Ajv()
  const schema = createSchemaTypeSchema({ includeDocs: true })
  expect(schema.properties.paragraphs.minItems).toEqual(1)
  expect(ajv.compile(schema)).toBeInstanceOf(Function)
})

test('A schemaType schema with tests can be created and compiled.', () => {
  const ajv = new Ajv()
  const schema = createSchemaTypeSchema({ includeTests: true })
  expect(schema.required).toEqual(expect.arrayContaining(['validTestCases', 'invalidTestCases']))
  expect(ajv.compile(schema)).toBeInstanceOf(Function)
})

test('A schemaType schema with documentation and tests can be created and compiled.', () => {
  const ajv = new Ajv()
  const schema = createSchemaTypeSchema({ includeDocs: true, includeTests: true })
  expect(schema.properties.paragraphs.minItems).toEqual(1)
  expect(schema.required).toEqual(expect.arrayContaining(['validTestCases', 'invalidTestCases']))
  expect(ajv.compile(schema)).toBeInstanceOf(Function)
})
