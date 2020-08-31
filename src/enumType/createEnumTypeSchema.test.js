/* eslint-env jest */
import { createCustomisedAjv } from '../validator'
import { createEnumTypeSchema } from './createEnumTypeSchema'

test('An enumType schema can be created and compiled.', () => {
  const ajv = createCustomisedAjv()
  const schema = createEnumTypeSchema()
  expect(ajv.compile(schema)).toBeInstanceOf(Function)
})

test('An enumType schema with documentation can be created and compiled.', () => {
  const ajv = createCustomisedAjv()
  const schema = createEnumTypeSchema({ includeDocs: true })
  expect(ajv.compile(schema)).toBeInstanceOf(Function)
})
