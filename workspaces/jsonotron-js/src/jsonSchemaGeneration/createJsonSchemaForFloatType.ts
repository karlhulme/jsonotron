import { AnySchema } from 'ajv'
import { FloatType } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON schema for the given float scalar type.
 * @param domain The domain for the $id of the schema.
 * @param floatType A float scalar type.
 */
export function createJsonSchemaForFloatType (domain: string, floatType: FloatType): AnySchema {
  return {
    $id: `${domain}/${floatType.system}/${floatType.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Float Type "${floatType.name}"`,
    type: 'number',
    minimum: !floatType.isMinimumExclusive ? floatType.minimum : undefined,
    exclusiveMinimum: floatType.isMinimumExclusive ? floatType.minimum : undefined,
    maximum: !floatType.isMaximumExclusive ? floatType.maximum : undefined,
    exclusiveMaximum: floatType.isMaximumExclusive ? floatType.maximum : undefined
  }
}
