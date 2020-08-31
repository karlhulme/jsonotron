import check from 'check-types'
import { deepClone, pascalToTitleCase } from '../utils'

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
    result.paragraphs = ['']
  }

  for (const item of result.items) {
    if (typeof item.paragraphs === 'undefined') {
      item.paragraphs = [pascalToTitleCase(item.value.toString())]
    }

    if (typeof item.symbol === 'undefined') {
      item.symbol = ''
    }

    if (typeof item.isDeprecated === 'undefined') {
      item.isDeprecated = false
    }
  }

  return result
}
