import check from 'check-types'
import { consts } from '../utils'
import { createJsonSchemaFragmentForEnumType } from '../enumType'
import { createJsonSchemaFragmentForSchemaType } from './createJsonSchemaFragmentForSchemaType'
import { determineReferencedTypeNames } from './determineReferencedTypeNames'

/**
 * Creates the definitions portion of a JSON Schema that includes the
 * json schemas defined for the given schemaTypeNames and enumTypeNames.
 * @param {Array} schemaTypeNames An array of schema type names.
 * @param {Array} schemaTypeNames An array of enum type names.
 * @param {Array} schemaTypes An array of schema types that may be referenced by the named schema types.
 * @param {Array} enumTypes An array of enum types that may be referenced by the named schema types.
 */
export function createJsonSchemaDefinition (schemaTypeNames, enumTypeNames, schemaTypes, enumTypes) {
  check.assert.array.of.string(schemaTypeNames)
  check.assert.array.of.string(enumTypeNames)
  check.assert.array.of.object(schemaTypes)
  check.assert.array.of.object(enumTypes)

  const referencedTypeNames = determineReferencedTypeNames(schemaTypeNames, enumTypeNames, schemaTypes, enumTypes)

  const defs = {}

  for (const schemaTypeName of referencedTypeNames.schemaTypeNames) {
    const schemaType = schemaTypes.find(ft => ft.name === schemaTypeName)
    defs[schemaTypeName] = createJsonSchemaFragmentForSchemaType(schemaType, consts.JSON_SCHEMA_DEFINITIONS_PATH)
  }

  for (const enumTypeName of referencedTypeNames.enumTypeNames) {
    const enumType = enumTypes.find(ft => ft.name === enumTypeName)
    defs[enumTypeName] = createJsonSchemaFragmentForEnumType(enumType)
  }

  return defs
}
