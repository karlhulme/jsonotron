import check from 'check-types'

/**
 * Returns the JSON schema fragment for the given enum type.  This is
 * essentially an object with an enum property filled with the item
 * values of the given enum type.
 * @param {Object} enumType A field type.
 */
export function createJsonSchemaFragmentForEnumType (enumType) {
  check.assert.object(enumType)
  check.assert.array(enumType.items)

  return {
    enum: enumType.items.map(item => item.value)
  }
}
