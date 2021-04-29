const { expect, test } = require('@jest/globals')
const fg = require('fast-glob')
const { readFile } = require('fs/promises')
const { parseTypeLibrary } = require('jsonotron-js')

test('The types of the jsonotron standard library are valid.', async () => {
  const typeFileNames = await fg('./typeLibrary/**/*.yaml')

  const resourceStrings = await Promise.all(typeFileNames.map(fileName => readFile(fileName, 'utf8')))

  console.log(`Found ${resourceStrings.length} resource strings.`)

  const typeLibrary = parseTypeLibrary({ resourceStrings })
  expect(typeLibrary.boolTypes).toHaveLength(1)
  expect(typeLibrary.enumTypes).toHaveLength(8)
  expect(typeLibrary.floatTypes).toHaveLength(7)
  expect(typeLibrary.intTypes).toHaveLength(6)
  expect(typeLibrary.objectTypes).toHaveLength(1)
  expect(typeLibrary.recordTypes).toHaveLength(8)
  expect(typeLibrary.stringTypes).toHaveLength(13)
})
