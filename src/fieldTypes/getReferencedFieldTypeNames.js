const check = require('check-types')
const { JsonotronFieldTypeResolutionError } = require('jsonotron-errors')

/**
 * Return an array that contains the names of all the field types identified
 * or referenced (directly or indirectly) by the given fieldTypeNames.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} fieldTypeNames An array of field type names.
 */
function getReferencedFieldTypeNames (fieldTypes, fieldTypeNames) {
  check.assert.array.of.object(fieldTypes)
  check.assert.array.of.string(fieldTypeNames)

  const resolvedNames = []

  for (const fieldTypeName of fieldTypeNames) {
    if (!resolvedNames.includes(fieldTypeName)) {
      resolvedNames.push(fieldTypeName)
    }
  }

  let index = 0

  // walk through the resolved names
  while (index < resolvedNames.length) {
    const target = resolvedNames[index]
    const refFieldType = fieldTypes.find(ft => ft.name === target)

    // check that each resolved name is in the fieldTypes array
    if (typeof refFieldType !== 'object' || refFieldType === null) {
      throw new JsonotronFieldTypeResolutionError(target)
    }

    // add any referenced field types to the resolved array if not already present
    if (Array.isArray(refFieldType.referencedFieldTypes)) {
      for (let i = 0; i < refFieldType.referencedFieldTypes.length; i++) {
        if (!resolvedNames.includes(refFieldType.referencedFieldTypes[i])) {
          resolvedNames.push(refFieldType.referencedFieldTypes[i])
        }
      }
    }

    index++
  }

  return resolvedNames
}

module.exports = getReferencedFieldTypeNames
