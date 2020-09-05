/* eslint-env jest */
import { createCompilationResult } from './createCompilationResult'

test('Creating a compilation result returns an object.', () => {
  expect(createCompilationResult(true, ['an', 'array'])).toEqual({
    compiled: true,
    errors: ['an', 'array']
  })
})
