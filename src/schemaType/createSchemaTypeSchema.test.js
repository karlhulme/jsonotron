/* eslint-env jest */
import { createCustomisedAjv } from '../validator'
import { createSchemaTypeSchema } from './createSchemaTypeSchema'

test('A schemaType schema can be created and compiled.', () => {
  const ajv = createCustomisedAjv()
  const schema = createSchemaTypeSchema()
  expect(ajv.compile(schema)).toBeInstanceOf(Function)
})

test('A schemaType schema with documentation can be created and compiled.', () => {
  const ajv = createCustomisedAjv()
  const schema = createSchemaTypeSchema({ includeDocs: true })
  expect(ajv.compile(schema)).toBeInstanceOf(Function)
})

test('A schemaType schema with tests can be created and compiled.', () => {
  const ajv = createCustomisedAjv()
  const schema = createSchemaTypeSchema({ includeTests: true })
  expect(ajv.compile(schema)).toBeInstanceOf(Function)
})

test('A schemaType schema with documentation and tests can be created and compiled.', () => {
  const ajv = createCustomisedAjv()
  const schema = createSchemaTypeSchema({ includeDocs: true, includeTests: true })
  expect(ajv.compile(schema)).toBeInstanceOf(Function)
})
