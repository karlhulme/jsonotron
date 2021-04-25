import { AnySchema } from 'ajv'
import { FloatScalarType } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON schema for the given float scalar type.
 * @param domain The domain for the $id of the schema.
 * @param floatScalarType A float scalar type.
 */
export function createJsonSchemaForFloatScalarType (domain: string, floatScalarType: FloatScalarType): AnySchema {
  return {
    $id: `${domain}/${floatScalarType.system}/${floatScalarType.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Float Scalar Type "${floatScalarType.name}"`,
    type: 'number',
    minimum: !floatScalarType.isMinimumExclusive ? floatScalarType.minimum : undefined,
    exclusiveMinimum: floatScalarType.isMinimumExclusive ? floatScalarType.minimum : undefined,
    maximum: !floatScalarType.isMaximumExclusive ? floatScalarType.maximum : undefined,
    exclusiveMaximum: floatScalarType.isMaximumExclusive ? floatScalarType.maximum : undefined
  }
}
