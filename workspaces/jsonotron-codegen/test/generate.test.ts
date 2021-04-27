import { expect, test } from '@jest/globals'
import { createTemplateProcessor, TemplateProcessorContext } from '../src'
import { createEmptyTypeLibrary } from './shared.test'

test('Generate code using a template.', async () => {
  const template = 'Generated: {{ generatedDateTime }}'

  const context: TemplateProcessorContext = {
    generatedDateTime: 'Today',
    typeLibrary: createEmptyTypeLibrary()
  }

  const templateProcessor = createTemplateProcessor({ name: 'test', content: template })

  const result = templateProcessor(context)

  expect(result).toEqual('Generated: Today')
})
