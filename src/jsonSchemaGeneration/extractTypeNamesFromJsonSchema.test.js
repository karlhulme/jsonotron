/* eslint-env jest */
import { extractTypeNamesFromJsonSchema } from './extractTypeNamesFromJsonSchema'

test('Extract type names from a schema with referenced types.', () => {
  expect(extractTypeNamesFromJsonSchema({
    type: 'object',
    properties: {
      propA: { $ref: '#/definitions/first' },
      propB: { $ref: '#/definitions/second' },
      propC: {
        type: 'object',
        properties: {
          propD: { $ref: '#/definitions/ns.third' }
        }
      }
    }
  })).toEqual(['first', 'second', 'ns.third'])
})

test('Extract no names from a schema without referenced types.', () => {
  expect(extractTypeNamesFromJsonSchema({})).toEqual([])
})
