import { expect, test } from '@jest/globals'
import fg from 'fast-glob'
import { mkdir, readFile } from 'fs/promises'
import { writeFile } from 'fs/promises'
import { parseTypeLibrary } from 'jsonotron-js'
import { loadTemplatesFromFolder, createTemplateProcessor, TemplateProcessorContext } from 'jsonotron-codegen'
import { sengiFactory } from '../src'

test('Generate output for each language.', async () => {
  const typeFileNames = await fg('./assets/typeLibrary/**/*.yaml')

  const resourceStrings = await Promise.all(typeFileNames.map(fileName => readFile(fileName, 'utf8')))
  const factories = [sengiFactory]

  const typeLibrary = parseTypeLibrary({ resourceStrings, factories })

  expect(typeLibrary.boolTypes).toHaveLength(1)
  expect(typeLibrary.enumTypes).toHaveLength(9)
  expect(typeLibrary.floatTypes).toHaveLength(7)
  expect(typeLibrary.intTypes).toHaveLength(6)
  expect(typeLibrary.objectTypes).toHaveLength(1)
  expect(typeLibrary.recordTypes).toHaveLength(16)
  expect(typeLibrary.stringTypes).toHaveLength(13)

  const context: TemplateProcessorContext = {
    typeLibrary,
    generatedDateTime: new Date().toISOString()
  }

  const templates = await loadTemplatesFromFolder('./assets/langTemplates')

  await Promise.all(templates.map(async template => {
    const processor = createTemplateProcessor(template)

    const result = processor(context)
    const outputFilePath = `./output/${chooseOutputName(template.name)}`

    await ensureDirectory(outputFilePath)
    await writeFile(outputFilePath, result, 'utf-8')
  }))
})

async function ensureDirectory (path: string): Promise<void> {
  const lastDividerIndex = path.lastIndexOf('/')
  await mkdir(path.slice(0, lastDividerIndex), { recursive: true })
}

function chooseOutputName (templateName: string): string {
  switch (templateName) {
    case 'graphql': return 'types.autogen.gql'
    case 'markdown': return 'types.autogen.md'
    case 'sengi': return 'sengi.autogen.ts'
    case 'typescript': return 'types.autogen.ts'
    default: return `${templateName}.autogen.txt`
  }
}
