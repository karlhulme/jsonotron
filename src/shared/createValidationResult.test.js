import { expect, test } from '@jest/globals'
import { createValidationResult } from './createValidationResult.js'

test('Creating a validator result returns an object.', () => {
  expect(createValidationResult(true, false, ['an', 'array'])).toEqual({
    recognised: true,
    validated: false,
    errors: ['an', 'array']
  })
})
