/* eslint-env jest */
import { JsonotronInitialisationError } from './JsonotronInitialisationError.js'

test('The JsonotronInitialisationError is constructed correctly.', () => {
  const err = new JsonotronInitialisationError([{}, {}])
  expect(err).toHaveProperty('name', 'JsonotronInitialisationError')
  expect(err.message).toMatch(/provided types were not valid/)
  expect(err).toHaveProperty('errors', [{}, {}])
})
