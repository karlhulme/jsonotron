const check = require('check-types')
const { JsonotronEnumTypeResolutionError, JsonotronFieldTypeResolutionError } = require('jsonotron-errors')

/**
 * Returns an object containing two arrays.  The first array contains all the field types
 * directly or indirectly referenced by the given field type names.  The second array contains
 * the enum types directly or indirectly referenced by the given field type and enum type names.
 * @param {Array} fieldTypeNames An array of field type names.
 * @param {Array} enumTypeNames An array of enum type names.
 * @param {Array} fieldTypes An array of field types.
 * @param {Array} enumTypes An array of enum types.
 */
function determineReferencedTypeNames (fieldTypeNames, enumTypeNames, fieldTypes, enumTypes) {
  check.assert.array.of.string(fieldTypeNames)
  check.assert.array.of.string(enumTypeNames)
  check.assert.array.of.object(fieldTypes)
  check.assert.array.of.object(enumTypes)

  const resolvedFieldTypeNames = []
  const resolvedEnumTypeNames = []

  // de-duplicate the provided field type names
  for (const name of fieldTypeNames) {
    if (!resolvedFieldTypeNames.includes(name)) {
      resolvedFieldTypeNames.push(name)
    }
  }

  // de-duplicate the provided enum type names
  for (const name of enumTypeNames) {
    if (!resolvedEnumTypeNames.includes(name)) {
      resolvedEnumTypeNames.push(name)
    }
  }

  let index = 0

  // walk through the resolved field type names, check they are valid, and look for referenced enum/field types
  while (index < resolvedFieldTypeNames.length) {
    const target = resolvedFieldTypeNames[index]
    const refFieldType = fieldTypes.find(ft => ft.name === target)

    if (refFieldType) {
      // add any referenced field types to the resolved array if not already present
      if (Array.isArray(refFieldType.referencedFieldTypes)) {
        for (let i = 0; i < refFieldType.referencedFieldTypes.length; i++) {
          if (!resolvedFieldTypeNames.includes(refFieldType.referencedFieldTypes[i])) {
            resolvedFieldTypeNames.push(refFieldType.referencedFieldTypes[i])
          }
        }
      }

      // check any referenced enum types are valid and then add to the resolved array if not already present
      if (Array.isArray(refFieldType.referencedEnumTypes)) {
        for (let i = 0; i < refFieldType.referencedEnumTypes.length; i++) {
          const candidateEnumTypeName = refFieldType.referencedEnumTypes[i]

          if (!resolvedEnumTypeNames.includes(candidateEnumTypeName)) {
            resolvedEnumTypeNames.push(candidateEnumTypeName)
          }
        }
      }
    } else {
      throw new JsonotronFieldTypeResolutionError(target)
    }

    index++
  }

  // check the enums are valid
  resolvedEnumTypeNames.forEach(enumTypeName => {
    if (enumTypes.findIndex(et => et.name === enumTypeName) === -1) {
      throw new JsonotronEnumTypeResolutionError(enumTypeName)
    }
  })

  return {
    fieldTypeNames: resolvedFieldTypeNames,
    enumTypeNames: resolvedEnumTypeNames
  }
}

module.exports = determineReferencedTypeNames
