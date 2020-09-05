import check from 'check-types'
import { deepClone } from '../utils'

/**
 * Patches a field block type so that all the optional fields have values.
 * Returns true if changes were made to the given fieldBlockDefinition.
 * @param {Object} fieldBlockDefinition A field block type that has been validated.
 */
export function patchFieldBlockDefinition (fieldBlockDefinition) {
  check.assert.object(fieldBlockDefinition)

  const result = deepClone(fieldBlockDefinition)

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
  })

  return result
}
