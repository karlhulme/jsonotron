import check from 'check-types'
import { deepClone, pascalToTitleCase } from '../utils'

/**
 * Patches a schema type so that all the optional fields have values.
 * Returns true if changes were made to the given schemaType.
 * @param {Object} schemaType A schema type that has been validated.
 */
export function patchSchemaType (schemaType) {
  check.assert.object(schemaType)

  const result = deepClone(schemaType)

  if (typeof result.title !== 'string') {
    result.title = pascalToTitleCase(schemaType.name)
  }

  if (typeof result.paragraphs === 'undefined') {
    result.paragraphs = ['']
  }

  if (typeof result.examples === 'undefined') {
    result.examples = []
  }

  for (const example of result.examples) {
    if (typeof example.paragraphs === 'undefined') {
      example.paragraphs = ['']
    }
  }

  if (typeof result.validTestCases === 'undefined') {
    result.validTestCases = []
  }

  if (typeof result.invalidTestCases === 'undefined') {
    result.invalidTestCases = []
  }

  if (typeof result.referencedSchemaTypes === 'undefined') {
    result.referencedSchemaTypes = []
  }

  if (typeof result.referencedEnumTypes === 'undefined') {
    result.referencedEnumTypes = []
  }

  return result
}