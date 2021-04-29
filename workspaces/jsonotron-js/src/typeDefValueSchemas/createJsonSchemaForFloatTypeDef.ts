import { AnySchema } from 'ajv'
import { FloatTypeDef } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON schema for the given float scalar type.
 * @param domain The domain for the $id of the schema.
 * @param floatTypeDef A float scalar type.
 */
export function createJsonSchemaForFloatTypeDef (domain: string, floatTypeDef: FloatTypeDef): AnySchema {
  return {
    $id: `${domain}/${floatTypeDef.system}/${floatTypeDef.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Float Type "${floatTypeDef.name}"`,
    type: 'number',
    minimum: !floatTypeDef.isMinimumExclusive ? floatTypeDef.minimum : undefined,
    exclusiveMinimum: floatTypeDef.isMinimumExclusive ? floatTypeDef.minimum : undefined,
    maximum: !floatTypeDef.isMaximumExclusive ? floatTypeDef.maximum : undefined,
    exclusiveMaximum: floatTypeDef.isMaximumExclusive ? floatTypeDef.maximum : undefined
  }
}
