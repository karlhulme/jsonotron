import { expect, test } from '@jest/globals'
import { parseTypeLibrary, UnrecognisedTypeKindError } from '../src'
import { reindentYaml } from './shared.test'

test('A type with an unrecognised kind cannot be parsed.', async () => {
  const invalidResource = reindentYaml(`
    ---
    kind: unknownScalar
    system: test
    name: testScalar
    summary: A test scalar.
  `)

  try {
    parseTypeLibrary({ resourceStrings: [invalidResource] })
    throw new Error('fail')
  } catch (err) {
    expect(err).toBeInstanceOf(UnrecognisedTypeKindError)
    expect(err).toHaveProperty('kind', 'unknownScalar')
  }
})
