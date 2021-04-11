import { expect, test } from '@jest/globals'
import * as lib from '../src'

test('The Jsonotron class is exported.', () => {
  expect(lib).toHaveProperty('parseResources')
})
