import { expect, test } from '@jest/globals'
import { createTemplateProcessor, TemplateProcessorContext, TemplatePartial } from '../src'
import { createEmptyTypeLibrary } from './shared.test'

test('Generate code using a template with a tree of multiple downstream partials.', async () => {
  const template = `Generated: {{> header }}`

  const partials: TemplatePartial[] = [{
    name: 'header',
    content: 'H1 {{> subHeader }}'
  }, {
    name: 'subHeader',
    content: 'H2 {{ identToConstCase generatedDateTime }}'
  }]

  const context: TemplateProcessorContext = {
    generatedDateTime: 'Recently',
    typeLibrary: createEmptyTypeLibrary()
  }

  const templateProcessor = createTemplateProcessor({ template, partials })

  const result = templateProcessor(context)

  expect(result).toEqual('Generated: H1 H2 RECENTLY')
})
