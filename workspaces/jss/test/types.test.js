const { expect, test } = require('@jest/globals')
const { parseTypeLibrary } = require('jsonotron-js')
const fg = require('fast-glob')
const { readFile } = require('fs/promises')

test('The types of the jsonotron standard library are valid.', async () => {
  const typeFileNames = await fg('./typeLibrary/**/*.yaml')

  const resourceStrings = await Promise.all(typeFileNames.map(fileName => readFile(fileName, 'utf8')))

  console.log(`Found ${resourceStrings.length} resource strings.`)

  const typeLibrary = parseTypeLibrary({ resourceStrings })
  expect(typeLibrary.arrayTypes).toHaveLength(2)
  expect(typeLibrary.boolTypes).toHaveLength(1)
  expect(typeLibrary.enumTypes).toHaveLength(9)
  expect(typeLibrary.floatTypes).toHaveLength(7)
  expect(typeLibrary.intTypes).toHaveLength(6)
  expect(typeLibrary.objectTypes).toHaveLength(1)
  expect(typeLibrary.recordTypes).toHaveLength(9)
  expect(typeLibrary.stringTypes).toHaveLength(13)
})
