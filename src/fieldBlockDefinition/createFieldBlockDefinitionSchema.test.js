import { expect, test } from '@jest/globals'
import Ajv from 'ajv'
import { createFieldBlockDefinitionSchema } from './createFieldBlockDefinitionSchema.js'

test('A field block type schema can be created and compiled.', () => {
  const ajv = new Ajv()
  const schema = createFieldBlockDefinitionSchema()
  expect(ajv.compile(schema)).toBeInstanceOf(Function)
})
