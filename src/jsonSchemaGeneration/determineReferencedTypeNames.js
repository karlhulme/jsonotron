import check from 'check-types'
import { extractTypeNamesFromJsonSchema } from './extractTypeNamesFromJsonSchema'

/**
 * Returns an object containing two arrays.
 * The first array contains all the schema types directly or indirectly referenced by the given schema type names.
 * The second array contains the enum types directly or indirectly referenced by the given schema type and enum type names.
 * @param {Array} rawTypeNames An initial set of type names.
 * @param {Array} schemaTypes An array of schema types.
 * @param {Array} enumTypes An array of enum types.
 */
export function determineReferencedTypeNames (rawTypeNames, schemaTypes, enumTypes) {
  check.assert.array.of.string(rawTypeNames)
  check.assert.array.of.object(schemaTypes)
  check.assert.array.of.object(enumTypes)

  const unresolvedTypeNames = []
  const resolvedSchemaTypeNames = []
  const resolvedEnumTypeNames = []

  // de-duplicate the raw types
  rawTypeNames.forEach(typeName => {
    if (!unresolvedTypeNames.includes(typeName)) {
      unresolvedTypeNames.push(typeName)
    }
  })

  let index = 0

  // walk through the unresolved type names and look for enum/schema types
  while (index < unresolvedTypeNames.length) {
    const target = unresolvedTypeNames[index]

    // try to match an enum type
    if (enumTypes.findIndex(e => e.name === target) > -1) {
      resolvedEnumTypeNames.push(target)
    } else {
      // else try to match a schema type
      const matchedSchemaType = schemaTypes.find(s => s.name === target)

      if (matchedSchemaType) {
        resolvedSchemaTypeNames.push(target)

        // for schema types - check for downstream references and add new ones to the unresolved list.
        const subReferencedRawTypeNames = extractTypeNamesFromJsonSchema(matchedSchemaType.jsonSchema)

        subReferencedRawTypeNames.forEach(subRawTypeName => {
          if (!unresolvedTypeNames.includes(subRawTypeName)) {
            unresolvedTypeNames.push(subRawTypeName)
          }
        })
      } else {
        // type was not found
        throw new Error(`Unable to resolve type name '${target}'.`)
      }
    }

    index++
  }

  return {
    schemaTypeNames: resolvedSchemaTypeNames.sort(),
    enumTypeNames: resolvedEnumTypeNames.sort()
  }
}
