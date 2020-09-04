import check from 'check-types'
import { createJsonSchemaFragmentForEnumType } from './createJsonSchemaFragmentForEnumType'
import { createJsonSchemaFragmentForSchemaType } from './createJsonSchemaFragmentForSchemaType'
import { determineReferencedTypeNames } from './determineReferencedTypeNames'

/**
 * Creates the definitions portion of a JSON Schema that includes the
 * json schemas defined for the given schemaTypeNames and enumTypeNames.
 * @param {Array} typeNames An array of type names.
 * @param {Array} schemaTypes An array of schema types that may be referenced by the named schema types.
 * @param {Array} enumTypes An array of enum types that may be referenced by the named schema types.
 */
export function createJsonSchemaDefinitionsSection (typeNames, schemaTypes, enumTypes) {
  check.assert.array.of.string(typeNames)
  check.assert.array.of.object(schemaTypes)
  check.assert.array.of.object(enumTypes)

  const referencedTypeNames = determineReferencedTypeNames(typeNames, schemaTypes, enumTypes)

  const defs = {}

  for (const schemaTypeName of referencedTypeNames.schemaTypeNames) {
    const schemaType = schemaTypes.find(ft => ft.name === schemaTypeName)
    defs[schemaTypeName] = createJsonSchemaFragmentForSchemaType(schemaType)
  }

  for (const enumTypeName of referencedTypeNames.enumTypeNames) {
    const enumType = enumTypes.find(ft => ft.name === enumTypeName)
    defs[enumTypeName] = createJsonSchemaFragmentForEnumType(enumType)
  }

  return defs
}
