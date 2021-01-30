import yaml from 'js-yaml'
import { ParseYamlError } from '../errors'
import { JsonotronType } from '../interfaces'

/**
 * Returns an object containing the parsed yaml contents.
 * @param contents The yaml contents.
 */
export function parseYaml (contents: string): JsonotronType {
  try {
    return yaml.load(contents, { }) as unknown as JsonotronType
  } catch (err) {
    throw new ParseYamlError(contents, err)
  }
}
