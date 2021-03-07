import { expect, test } from '@jest/globals'
import { getTestJsonoserveTypes } from './shared.test'
import { TypescriptCodeGenerator } from './codegen_typescript'

test('Generate typescript code.', async () => {
  const types = getTestJsonoserveTypes()
  const generator = new TypescriptCodeGenerator()
  const result = generator.generate({ types })

  // useful for debug
  console.log(result)

  expect(result).toContain('export const test = {')
  expect(result).toContain('export const alt = {')
  expect(result).toContain('color: \'https://jsonotron.org/test/color\'')
  expect(result).toContain('regular: \'regular\'')
  expect(result).toContain('{ value: \'xlarge\', text: \'Extra Large\', deprecated: \'Cannot source anymore.\' }')
})
