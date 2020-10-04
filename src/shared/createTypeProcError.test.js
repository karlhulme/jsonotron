import { expect, test } from '@jest/globals'
import { createTypeProcError } from './createTypeProcError.js'

test('Creating a type processing error returns an object.', () => {
  expect(createTypeProcError('myType', 'myMessage', { the: 'details' })).toEqual({
    typeName: 'myType',
    message: 'myMessage',
    details: { the: 'details' }
  })
})
