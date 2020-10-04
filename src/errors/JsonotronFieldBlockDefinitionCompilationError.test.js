import { expect, test } from '@jest/globals'
import { JsonotronFieldBlockDefinitionCompilationError } from './JsonotronFieldBlockDefinitionCompilationError.js'

test('The JsonotronFieldBlockDefinitionCompilationError is constructed correctly.', () => {
  const err = new JsonotronFieldBlockDefinitionCompilationError([{}, {}])
  expect(err).toHaveProperty('name', 'JsonotronFieldBlockDefinitionCompilationError')
  expect(err.message).toMatch(/failed because the definition was not valid/)
  expect(err).toHaveProperty('errors', [{}, {}])
})
