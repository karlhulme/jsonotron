const fg = require('fast-glob')
const { parseResources } = require('jsonotron-js')
const { generateMarkdown } = require('jsonotron-codegen')
const { readFile, writeFile } = require('fs/promises')

async function run () {
  const enumTypeFileNames = await fg('./enumTypes/*.yaml')
  const schemaTypeFileNames = await fg('./schemaTypes/*.yaml')
  const typeFileNames = enumTypeFileNames.concat(schemaTypeFileNames)

  const resourceStrings = await Promise.all(typeFileNames.map(fileName => readFile(fileName, 'utf8')))

  const resources = parseResources({ resourceStrings })
  const markdown = generateMarkdown({ enumTypes: resources.enumTypes, schemaTypes: resources.schemaTypes })

  await writeFile('./typedocs.autogen.md', markdown)
}

run()
