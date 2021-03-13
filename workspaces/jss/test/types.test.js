const { expect, test } = require('@jest/globals')
const { Jsonotron } = require('jsonotron-js')
const fg = require('fast-glob')
const { readFile } = require('fs/promises')

test('The enum and schema types of the jsonotron standard library are valid.', async () => {
  const enumTypeFileNames = await fg('./enumTypes/*.yaml')
  const schemaTypeFileNames = await fg('./schemaTypes/*.yaml')
  const typeFileNames = enumTypeFileNames.concat(schemaTypeFileNames)

  const types = await Promise.all(typeFileNames.map(fileName => readFile(fileName, 'utf8')))

  expect(() => { new Jsonotron({ types }) }).not.toThrow()
})
