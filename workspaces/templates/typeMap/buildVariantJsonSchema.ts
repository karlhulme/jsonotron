import { SchemaTypeVariant } from 'jsonotron-interfaces'
import { omitBy, pickBy } from 'lodash'

/**
 * Creates a new JSON schema, based on the given schema, that honours
 * the requirements set out in the given variant object.
 * @param jsonSchema A json schema.
 * @param variant A variant definition from a schema type.
 */
export function buildVariantJsonSchema (jsonSchema: Record<string, unknown>, variant: SchemaTypeVariant): Record<string, unknown> {
  const variantSchema = { ...jsonSchema }

  if (variant.partial) {
    delete variantSchema.required
  }

  variantSchema.properties = Array.isArray(variant.includeFields)
    ? pickBy(jsonSchema.properties as Record<string, unknown>, (value, key) => (variant.includeFields as string[]).includes(key))
    : omitBy(jsonSchema.properties as Record<string, unknown>, (value, key) => (variant.excludeFields as string[]).includes(key))

  return variantSchema
}
