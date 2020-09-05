/* eslint-env jest */
import { createErrorOrWarning } from './createErrorOrWarning'

test('Creating an error or warning returns an object.', () => {
  expect(createErrorOrWarning('myType', 'myMessage', { the: 'details' })).toEqual({
    typeName: 'myType',
    message: 'myMessage',
    details: { the: 'details' }
  })
})
