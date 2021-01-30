import { expect, test } from '@jest/globals'
import fs from 'fs'
import { createJsonoserveExpress } from '../src'

test('The jsonoserve constructor works with no types supplied.', () => {
  expect(() => createJsonoserveExpress({ types: [] })).not.toThrow()
})

test('The jsonoserve constructor works with valid types.', () => {
  const animalType = fs.readFileSync('./test/testTypes/animal.yaml', 'utf-8')
  const hairColorType = fs.readFileSync('./test/testTypes/hairColor.yaml', 'utf-8')
  const trouserStyle = fs.readFileSync('./test/testTypes/trouserStyle.yaml', 'utf-8')

  expect(() => createJsonoserveExpress({
    types: [animalType, hairColorType, trouserStyle]
  })).not.toThrow()
})

test('The jsonoserve constructor fails with invalid types.', () => {
  const fakeType = '::here:: error\n@£$%^&*'

  expect(() => createJsonoserveExpress({
    types: [fakeType]
  })).toThrow()
})
