/* eslint-env jest */
import Ajv from 'ajv'
import { createFieldBlockTypeSchema } from './createFieldBlockTypeSchema'

test('A field block type schema can be created and compiled.', () => {
  const ajv = new Ajv()
  const schema = createFieldBlockTypeSchema()
  expect(schema.properties.fields.additionalProperties.properties.paragraphs.minItems).toEqual(0)
  expect(ajv.compile(schema)).toBeInstanceOf(Function)
})

test('A field block type schema with documentation can be created and compiled.', () => {
  const ajv = new Ajv()
  const schema = createFieldBlockTypeSchema({ includeDocs: true })
  expect(schema.properties.fields.additionalProperties.properties.paragraphs.minItems).toEqual(1)
  expect(ajv.compile(schema)).toBeInstanceOf(Function)
})
