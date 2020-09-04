import check from 'check-types'

/**
 * Gets the type names that are referenced in the given schema.
 * @param {Object} jsonSchema A json schema.
 */
export function extractTypeNamesFromJsonSchema (jsonSchema) {
  check.assert.object(jsonSchema)

  const jsonSchemaString = JSON.stringify(jsonSchema)
  const matches = jsonSchemaString.match(/#\/definitions\/[a-zA-Z0-9.]+/g)

  return matches ? matches.map(m => m.substring(14)) : []
}
