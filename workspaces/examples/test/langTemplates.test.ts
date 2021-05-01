import { test } from '@jest/globals'
import fg from 'fast-glob'
import { readFile } from 'fs/promises'
import { writeFile } from 'fs/promises'
import { parseTypeLibrary } from 'jsonotron-js'
import { loadTemplatesFromFolder, createTemplateProcessor, TemplateProcessorContext } from 'jsonotron-codegen'

function chooseOutputName (templateName: string): string {
  switch (templateName) {
    case 'markdown': return 'markdown.md'
    case 'typescript': return 'typescript.ts'
    default: return `${templateName}.txt`
  }
}

test('Generate output for each language.', async () => {
  const typeFileNames = await fg('./src/typeLibrary/**/*.yaml')

  const resourceStrings = await Promise.all(typeFileNames.map(fileName => readFile(fileName, 'utf8')))

  const context: TemplateProcessorContext = {
    typeLibrary: parseTypeLibrary({ resourceStrings }),
    generatedDateTime: new Date().toISOString()
  }

  const templates = await loadTemplatesFromFolder('./src/langTemplates')

  await Promise.all(templates.map(async template => {
    const processor = createTemplateProcessor(template)

    const result = processor(context)

    await writeFile(`./output/${chooseOutputName(template.name)}`, result, 'utf-8')
  }))
})
