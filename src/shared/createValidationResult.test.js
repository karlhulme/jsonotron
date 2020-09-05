/* eslint-env jest */
import { createValidationResult } from './createValidationResult'

test('Creating a validator result returns an object.', () => {
  expect(createValidationResult(true, false, ['an', 'array'])).toEqual({
    recognised: true,
    validated: false,
    errors: ['an', 'array']
  })
})
