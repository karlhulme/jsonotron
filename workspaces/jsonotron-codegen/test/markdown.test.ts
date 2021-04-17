import { expect, test } from '@jest/globals'
import { generateMarkdown } from '../src'
import { getTestTypes } from './shared.test'
// import { writeFile } from 'fs/promises' // useful for debug

test('Generate markdown.', async () => {
  const testTypes = getTestTypes()

  const result = generateMarkdown({
    enumTypes: testTypes.enumTypes,
    schemaTypes: testTypes.schemaTypes
  })

  // await writeFile('./test/temp.md', result) // useful for debug

  expect(result).toContain('# Type Systems')
  expect(result).toContain('## "test" System')
  expect(result).toContain('## "extra" System')
  expect(result).toContain('### color')
  expect(result).toContain('### direction')
  expect(result).toContain('### bed')
  expect(result).toContain('### pillow')
  expect(result).toContain('#### Example 1')
  expect(result).toContain('#### Schema')
})
