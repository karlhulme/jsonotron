import { expect, test } from '@jest/globals'
import { MarkdownGenerator } from '../src'
import { getTestTypes } from './shared.test'

test('Generate typescript code.', async () => {
  const testTypes = getTestTypes()
  const generator = new MarkdownGenerator()
  const result = generator.generate({
    enumTypes: testTypes.enumTypes,
    schemaTypes: testTypes.schemaTypes
  })

  // useful for debug
  // console.log(result)

  expect(result).toContain('# Type Systems')
  expect(result).toContain('## "test" System')
  expect(result).toContain('## "extra" System')
  expect(result).toContain('### Color')
  expect(result).toContain('### Direction')
  expect(result).toContain('### Bed')
  expect(result).toContain('### Pillow')
  expect(result).toContain('#### Example 1')
  expect(result).toContain('#### Schema')
})

