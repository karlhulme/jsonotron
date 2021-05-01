import { expect, test } from '@jest/globals'
import fg from 'fast-glob'
import { readFile } from 'fs/promises'
import { parseTypeLibrary } from 'jsonotron-js'

test('The example types of the library are valid.', async () => {
  const typeFileNames = await fg('./src/typeLibrary/**/*.yaml')

  const resourceStrings = await Promise.all(typeFileNames.map(fileName => readFile(fileName, 'utf8')))

  console.log(`Found ${resourceStrings.length} resource strings.`)

  const typeLibrary = parseTypeLibrary({ resourceStrings })
  expect(typeLibrary.boolTypes).toHaveLength(1)
  expect(typeLibrary.enumTypes).toHaveLength(9)
  expect(typeLibrary.floatTypes).toHaveLength(7)
  expect(typeLibrary.intTypes).toHaveLength(6)
  expect(typeLibrary.objectTypes).toHaveLength(1)
  expect(typeLibrary.recordTypes).toHaveLength(11)
  expect(typeLibrary.stringTypes).toHaveLength(13)
})
