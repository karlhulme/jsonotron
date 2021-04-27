const { expect, test } = require('@jest/globals')
const { writeFile } = require('fs/promises')
const { loadTemplatesFromFolder, createTemplateProcessor } = require('jsonotron-codegen')
const { createSampleTypeLibrary } = require('./shared.test.js')

test('Generate output for each language.', async () => {
  const templates = await loadTemplatesFromFolder('./langs')

  const context = {
    typeLibrary: createSampleTypeLibrary(),
    generatedDateTime: new Date().toISOString()
  }

  await Promise.all(templates.map(async template => {
    const processor = createTemplateProcessor(template)

    const result = processor(context)

    await writeFile(`./output/${template.name}.txt`, result, 'utf-8')
  }))
})
