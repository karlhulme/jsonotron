const { expect, test } = require('@jest/globals')
const { parseResources } = require('jsonotron-js')
const fg = require('fast-glob')
const { readFile } = require('fs/promises')

test('The enum and schema types of the jsonotron standard library are valid.', async () => {
  const enumTypeFileNames = await fg('./enumTypes/*.yaml')
  const schemaTypeFileNames = await fg('./schemaTypes/*.yaml')
  const typeFileNames = enumTypeFileNames.concat(schemaTypeFileNames)

  const resourceStrings = await Promise.all(typeFileNames.map(fileName => readFile(fileName, 'utf8')))

  console.log(`Found ${resourceStrings.length} resource strings.`)

  const resources = parseResources({ resourceStrings })
  expect(resources.enumTypes).toHaveLength(8)
  expect(resources.schemaTypes).toHaveLength(35)
})
