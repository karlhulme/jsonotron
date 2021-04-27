import { expect, test } from '@jest/globals'
import { createTemplateProcessor, TemplateProcessorContext, TemplatePartial } from '../src'
import { createEmptyTypeLibrary } from './shared.test'

test('Generate code using a template and a partial.', async () => {
  const template = `Generated: {{> header }}`

  const partials: TemplatePartial[] = [{
    name: 'header',
    content: 'H1 {{ generatedDateTime }}'
  }]

  const context: TemplateProcessorContext = {
    generatedDateTime: 'Just then',
    typeLibrary: createEmptyTypeLibrary()
  }

  const templateProcessor = createTemplateProcessor({ template, partials })

  const result = templateProcessor(context)

  expect(result).toEqual('Generated: H1 Just then')
})
