import check from 'check-types'

/**
 * Returns the JSON schema fragment of the given schema type.
 * This will be the local fragment only, it will not include
 * any referenced dependencies.
 * @param {Object} schemaType A schema type.
 * @param {String} definitionsPath The path to any referenced schema definitions,
 * usually #/definitions/.
 */
export function createJsonSchemaFragmentForSchemaType (schemaType, definitionsPath) {
  check.assert.object(schemaType)
  check.assert.maybe.string(definitionsPath)

  if (typeof schemaType.jsonSchema === 'function') {
    return schemaType.jsonSchema(definitionsPath)
  } else {
    return JSON.parse(JSON.stringify(schemaType.jsonSchema))
  }
}
