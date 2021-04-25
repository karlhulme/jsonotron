const { expect, test } = require('@jest/globals')
const { parseTypeLibrary } = require('jsonotron-js')
const fg = require('fast-glob')
const { readFile } = require('fs/promises')

test('The types of the jsonotron standard library are valid.', async () => {
  const typeFileNames = await fg('./typeDefinitions/**/*.yaml')

  console.log(typeFileNames)

  const resourceStrings = await Promise.all(typeFileNames.map(fileName => readFile(fileName, 'utf8')))

  console.log(`Found ${resourceStrings.length} resource strings.`)

  const typeLibrary = parseTypeLibrary({ resourceStrings })
  expect(typeLibrary.arrayTypes).toHaveLength(2)
  expect(typeLibrary.boolScalarTypes).toHaveLength(1)
  expect(typeLibrary.enumScalarTypes).toHaveLength(9)
  expect(typeLibrary.floatScalarTypes).toHaveLength(7)
  expect(typeLibrary.intScalarTypes).toHaveLength(6)
  expect(typeLibrary.objectTypes).toHaveLength(1)
  expect(typeLibrary.recordTypes).toHaveLength(9)
  expect(typeLibrary.stringScalarTypes).toHaveLength(14)
})
