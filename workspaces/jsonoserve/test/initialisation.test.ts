import { expect, test } from '@jest/globals'
import { readFile } from 'fs/promises'
import { createJsonoserveExpress } from '../src'

test('The jsonoserve constructor works with no resource strings supplied.', () => {
  expect(() => createJsonoserveExpress({ resourceStrings: [], domain: 'https://testing.org' })).not.toThrow()
})

test('The jsonoserve constructor works with valid resource strings.', async () => {
  const animalType = await readFile('./test/testTypes/animal.yaml', 'utf-8')
  const hairColorType = await readFile('./test/testTypes/hairColor.yaml', 'utf-8')
  const trouserStyle = await readFile('./test/testTypes/trouserStyle.yaml', 'utf-8')

  expect(() => createJsonoserveExpress({
    resourceStrings: [animalType, hairColorType, trouserStyle],
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
