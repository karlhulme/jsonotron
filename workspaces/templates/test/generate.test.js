const { expect, test } = require('@jest/globals')
const { writeFile } = require('fs/promises')
const { loadTemplatesFromFolder, createTemplateProcessor } = require('jsonotron-codegen')
const { createSampleTypeLibrary } = require('./shared.test.js')

function chooseOutputName (templateName) {
  switch (templateName) {
    case 'typescript': return 'typescript.ts'
    default: return `${templateName}.txt`
  }
}

test('Generate output for each language.', async () => {
  const templates = await loadTemplatesFromFolder('./langs')

  const context = {
    typeLibrary: createSampleTypeLibrary(),
    generatedDateTime: new Date().toISOString()
  }

  await Promise.all(templates.map(async template => {
    const processor = createTemplateProcessor(template)

    const result = processor(context)

    await writeFile(`./output/${chooseOutputName(template.name)}`, result, 'utf-8')
  }))
})
