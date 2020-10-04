import check from 'check-types'
import { deepClone, pascalToTitleCase } from '../shared/index.js'

/**
 * Patches an enum type so that all the optional fields have values.
 * Returns true if changes were made to the given enumType.
 * @param {Object} enumType An enum type that has been validated.
 */
export function patchEnumType (enumType) {
  check.assert.object(enumType)

  const result = deepClone(enumType)

  if (typeof result.title !== 'string') {
    result.title = pascalToTitleCase(enumType.name)
  }

  if (typeof result.paragraphs === 'undefined') {
    result.paragraphs = []
  }

  result.items.forEach(item => {
    if (typeof item.paragraphs === 'undefined') {
      item.paragraphs = []
    }

    if (typeof item.symbol === 'undefined') {
      item.symbol = ''
    }

    if (typeof item.isDeprecated === 'undefined') {
      item.isDeprecated = false
    }
  })

  return result
}
