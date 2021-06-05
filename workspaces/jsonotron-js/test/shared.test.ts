import { expect, test } from '@jest/globals'

test('Prevent warnings on shared.test about missing tests.', async () => {
  expect(1 + 1).toEqual(2)
})

export const TEST_DOMAIN = 'https://jsonotron-testing.org'

export const testSmallIntType = reindentYaml(`
  ---
  kind: int
  system: test
  name: smallInt
  summary: A simple int type that can be referenced by other types for testing purposes.
  minimum: -128
  maximum: 128
`)

export const testShortString = reindentYaml(`
  ---
  kind: string
  system: test
  name: shortString
  summary: A simple string type that can be referenced by other types for testing purposes.
  maximumLength: 20
`)

export function reindentYaml (yaml: string): string {
  const hyphensIndex = yaml.indexOf('---\n')

  if (hyphensIndex === -1) {
    throw new Error('Could not find yaml indicator ---')
  }

  const opening = yaml.substring(0, hyphensIndex)
  const lastNewLineIndex = opening.lastIndexOf('\n')

  if (lastNewLineIndex === -1) {
    throw new Error('Could not find last new line indicator before yaml indicator.')
  }

  const indentationSize = opening.length - lastNewLineIndex - 1

  const lines = yaml.split('\n').map(s => s.substring(indentationSize)).join('\n')

  return lines
}

/**
 * Forcibly converts the object to an Error type which works around a bug
 * where Typescript does not recognise custom errors.
 * @param errType Any error type.
 */
export function asError (errType: unknown): Error {
  return errType as Error
} 
