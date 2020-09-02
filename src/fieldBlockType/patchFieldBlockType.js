import check from 'check-types'
import { deepClone, pascalToTitleCase } from '../utils'

/**
 * Patches a field block type so that all the optional fields have values.
 * Returns true if changes were made to the given fieldBlockType.
 * @param {Object} fieldBlockType A field block type that has been validated.
 */
export function patchFieldBlockType (fieldBlockType) {
  check.assert.object(fieldBlockType)

  const result = deepClone(fieldBlockType)

  if (typeof result.title === 'undefined') {
    result.title = pascalToTitleCase(result.name)
  }

  if (typeof result.paragraphs === 'undefined') {
    result.paragraphs = []
  }

  if (typeof result.examples === 'undefined') {
    result.examples = []
  }

  result.examples.forEach(example => {
    if (typeof example.paragraphs === 'undefined') {
      example.paragraphs = []
    }
  })

  Object.keys(result.fields).forEach(fieldName => {
    const field = result.fields[fieldName]

    if (typeof field.isRequired === 'undefined') {
      field.isRequired = false
    }

    if (typeof field.isNullable === 'undefined') {
      field.isNullable = false
    }

    if (typeof field.isArray === 'undefined') {
      field.isArray = false
    }

    if (typeof field.flags === 'undefined') {
      field.flags = {}
    }

    if (typeof field.paragraphs === 'undefined') {
      field.paragraphs = []
    }
  })

  return result
}
