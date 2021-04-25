import { expect, test } from '@jest/globals'
import { InvalidTypeError, parseTypeLibrary } from '../src'
import { reindentYaml } from './shared.test'

test('An invalid type cannot be parsed.', async () => {
  const invalidType = reindentYaml(`
    ---
    kind: floatScalar
    system: test
    name: invalidType
    summary: A malformed float type.
    minimum: two_point_five
    maximum: 5.75
  `)

  try {
    parseTypeLibrary({ resourceStrings: [invalidType] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidTypeError)
    expect(err).toHaveProperty('typeName', 'invalidType')
    expect(err).toHaveProperty('typeKind', 'floatScalar')
  }
})
