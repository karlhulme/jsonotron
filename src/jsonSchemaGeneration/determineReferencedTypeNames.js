import check from 'check-types'

/**
 * Returns an object containing four arrays.
 * The first array contains all the schema types directly or indirectly referenced by the given schema type names.
 * The second array contains the enum types directly or indirectly referenced by the given schema type and enum type names.
 * @param {Array} schemaTypeNames An array of schema type names.
 * @param {Array} enumTypeNames An array of enum type names.
 * @param {Array} schemaTypes An array of schema types.
 * @param {Array} enumTypes An array of enum types.
 */
export function determineReferencedTypeNames (schemaTypeNames, enumTypeNames, schemaTypes, enumTypes) {
  check.assert.array.of.string(schemaTypeNames)
  check.assert.array.of.string(enumTypeNames)
  check.assert.array.of.object(schemaTypes)
  check.assert.array.of.object(enumTypes)

  const resolvedSchemaTypeNames = []
  const resolvedEnumTypeNames = []

  // de-duplicate the provided schema type names
  for (const name of schemaTypeNames) {
    if (!resolvedSchemaTypeNames.includes(name)) {
      resolvedSchemaTypeNames.push(name)
    }
  }

  // de-duplicate the provided enum type names
  for (const name of enumTypeNames) {
    if (!resolvedEnumTypeNames.includes(name)) {
      resolvedEnumTypeNames.push(name)
    }
  }

  let index = 0

  // walk through the resolved schema type names, check they are valid, and look for referenced enum/schema types
  while (index < resolvedSchemaTypeNames.length) {
    const target = resolvedSchemaTypeNames[index]
    const refSchemaType = schemaTypes.find(ft => ft.name === target)

    if (refSchemaType) {
      // add any referenced schema types to the resolved array if not already present
      if (Array.isArray(refSchemaType.referencedSchemaTypes)) {
        for (let i = 0; i < refSchemaType.referencedSchemaTypes.length; i++) {
          if (!resolvedSchemaTypeNames.includes(refSchemaType.referencedSchemaTypes[i])) {
            resolvedSchemaTypeNames.push(refSchemaType.referencedSchemaTypes[i])
          }
        }
      }

      // check any referenced enum types are valid and then add to the resolved array if not already present
      if (Array.isArray(refSchemaType.referencedEnumTypes)) {
        for (let i = 0; i < refSchemaType.referencedEnumTypes.length; i++) {
          const candidateEnumTypeName = refSchemaType.referencedEnumTypes[i]

          if (!resolvedEnumTypeNames.includes(candidateEnumTypeName)) {
            resolvedEnumTypeNames.push(candidateEnumTypeName)
          }
        }
      }
    } else {
      throw new Error(`Unable to resolve schemaType '${target}'.`)
    }

    index++
  }

  // check the enums are valid
  resolvedEnumTypeNames.forEach(enumTypeName => {
    if (enumTypes.findIndex(et => et.name === enumTypeName) === -1) {
      throw new Error(`Unable to resolve enumType '${enumTypeName}'.`)
    }
  })

  return {
    schemaTypeNames: resolvedSchemaTypeNames,
    enumTypeNames: resolvedEnumTypeNames
  }
}
