import { expect, test } from '@jest/globals'
import { readFile } from 'fs/promises'
import { createJsonoserveExpress } from '../src'

test('The jsonoserve constructor works with missing parameters.', () => {
  expect(() => createJsonoserveExpress()).not.toThrow()
  expect(() => createJsonoserveExpress({})).not.toThrow()
  expect(() => createJsonoserveExpress({ resourceStrings: [] })).not.toThrow()
  expect(() => createJsonoserveExpress({ domain: 'https://testing.org' })).not.toThrow()
})

test('The jsonoserve constructor works with valid resource strings.', async () => {
  const miniIntType = await readFile('./test/testTypeLibrary/miniInt.yaml', 'utf-8')

  expect(() => createJsonoserveExpress({
    resourceStrings: [miniIntType],
    domain: 'https://testing.org'
  })).not.toThrow()
})

test('The jsonoserve constructor fails with invalid resource strings.', () => {
  const fakeType = '::here:: error\n@£$%^&*'

  expect(() => createJsonoserveExpress({
    resourceStrings: [fakeType],
    domain: 'https://testing.org'
  })).toThrow()
})
