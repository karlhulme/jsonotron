import { expect, test } from '@jest/globals'
import { getTestTypes } from './shared.test'
import { GraphQLCodeGenerator } from '../src'

test('Generate graph ql code.', async () => {
  const testTypes = getTestTypes()
  const generator = new GraphQLCodeGenerator()
  const result = generator.generate({
    enumTypes: testTypes.enumTypes,
    schemaTypes: testTypes.schemaTypes
  })

  // useful for debug
  // console.log(result)

  // the object-type interfaces
  expect(result).toContain('type Bed {')
  expect(result).toContain('type Pillow {')
})
