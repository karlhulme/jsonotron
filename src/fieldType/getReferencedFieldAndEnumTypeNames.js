const check = require('check-types')
const { JsonotronFieldTypeResolutionError } = require('jsonotron-errors')

/**
 * Return an array that contains the names of all the field ad enum types identified
 * or referenced (directly or indirectly) by the given fieldAndEnumTypeNames.
 * @param {Array} fieldAndEnumTypeNames An array of field type and enum type names.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 */
function getReferencedFieldAndEnumTypeNames (fieldAndEnumTypeNames, fieldTypes, enumTypes) {
  check.assert.array.of.string(fieldAndEnumTypeNames)
  check.assert.array.of.object(fieldTypes)
  check.assert.array.of.object(enumTypes)

  const resolvedNames = []

  // de-duplicate the provided names
  for (const name of fieldAndEnumTypeNames) {
    if (!resolvedNames.includes(name)) {
      resolvedNames.push(name)
    }
  }

  let index = 0

  // walk through the resolved names
  while (index < resolvedNames.length) {
    const target = resolvedNames[index]
    const refFieldType = fieldTypes.find(ft => ft.name === target)
    const refEnumType = enumTypes.find(et => et.name === target)

    if (refFieldType) {
      // add any referenced field types to the resolved array if not already present
      if (Array.isArray(refFieldType.referencedFieldTypes)) {
        for (let i = 0; i < refFieldType.referencedFieldTypes.length; i++) {
          if (!resolvedNames.includes(refFieldType.referencedFieldTypes[i])) {
            resolvedNames.push(refFieldType.referencedFieldTypes[i])
          }
        }
      }

      // add any referenced enum types to the resolved array if not already present
      if (Array.isArray(refFieldType.referencedEnumTypes)) {
        for (let i = 0; i < refFieldType.referencedEnumTypes.length; i++) {
          if (!resolvedNames.includes(refFieldType.referencedEnumTypes[i])) {
            resolvedNames.push(refFieldType.referencedEnumTypes[i])
          }
        }
      }
    } else if (refEnumType) {
      // no additional references to resolve
    } else {
      throw new JsonotronFieldTypeResolutionError(target)
    }

    index++
  }

  return resolvedNames
}

module.exports = getReferencedFieldAndEnumTypeNames
