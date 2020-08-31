import check from 'check-types'
import { deepClone } from '../utils'

/**
 * Returns the JSON schema fragment of the given schema type.
 * This will be the local fragment only, it will not include
 * any referenced dependencies.
 * @param {Object} schemaType A schema type.
 */
export function createJsonSchemaFragmentForSchemaType (schemaType) {
  check.assert.object(schemaType)

  return deepClone(schemaType.jsonSchema)
}
