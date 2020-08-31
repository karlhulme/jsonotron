import check from 'check-types'
import { consts } from '../utils'

/**
 * Build the properties object.
 * @param {Object} parameterBlock A block of parameter declarations.
 */
function buildPropertiesObject (parameterBlock) {
  const properties = {}

  for (const parameterName in parameterBlock) {
    properties[parameterName] = { type: 'string' }
  }

  return properties
}

/**
 * Build the array of required parameter names.
 * @param {Object} parameterBlock A block of parameter declarations.
 */
function buildRequiredArray (parameterBlock) {
  const required = []

  for (const parameterName in parameterBlock) {
    const parameter = parameterBlock[parameterName]

    if (parameter.isRequired || parameter.isGuaranteed) {
      required.push(parameterName)
    }
  }

  return required
}

/**
 * Creates a JSON Schema for the given block of string parameter declarations.
 * @param {String} title The title to be applied to the returned schema.
 * @param {Object} parameterBlock A block of field declaratinons.
 */
export function createJsonSchemaForParameterStringBlock (title, parameterBlock) {
  check.assert.string(title)
  check.assert.object(parameterBlock)

  return {
    $schema: consts.JSON_SCHEMA_DECLARATION,
    title,
    type: 'object',
    properties: buildPropertiesObject(parameterBlock),
    required: buildRequiredArray(parameterBlock)
  }
}
