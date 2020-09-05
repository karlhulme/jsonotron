/* eslint-env jest */
import { arrayContainsErrorOrWarningWithAjvDetails } from './arrayContainsErrorOrWarningWithAjvDetails'

test('Creating an error or warning returns an object.', () => {
  const array = [
    { details: { keyword: 'kw1', dataPath: 'foo/bar' } }
  ]

  expect(arrayContainsErrorOrWarningWithAjvDetails(array, { keyword: 'kw1', dataPath: 'foo/bar' })).toEqual(true)
  expect(arrayContainsErrorOrWarningWithAjvDetails(array, { keyword: 'kw1' })).toEqual(false)
  expect(arrayContainsErrorOrWarningWithAjvDetails(array, { dataPath: 'foo/bar' })).toEqual(false)
  expect(arrayContainsErrorOrWarningWithAjvDetails(array, { keyword: 'kw2', dataPath: 'foo/bar' })).toEqual(false)
})
