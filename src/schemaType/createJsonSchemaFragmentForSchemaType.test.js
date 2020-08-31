/* eslint-env jest */
import { createJsonSchemaFragmentForSchemaType } from './createJsonSchemaFragmentForSchemaType'

const schemaType = {
  name: 'schemaType',
  jsonSchema: {
    type: 'string'
  }
}

const schemaTypeWithSchemaFunction = {
  name: 'schemaTypeWithSchemaFunction',
  jsonSchema: definitionsPath => ({
    $ref: `${definitionsPath}customType`
  })
}

test('Create json schema fragment of a schema type.', () => {
  expect(createJsonSchemaFragmentForSchemaType(schemaType, '#/definitions/')).toEqual({ type: 'string' })
})

test('Create json schema of a function-backed schema type.', () => {
  expect(createJsonSchemaFragmentForSchemaType(schemaTypeWithSchemaFunction, '#/definitions/')).toEqual({ $ref: '#/definitions/customType' })
})
