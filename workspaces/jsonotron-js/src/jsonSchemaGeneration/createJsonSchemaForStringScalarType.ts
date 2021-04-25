import { AnySchema } from 'ajv'
import { StringScalarType } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON schema for the given string scalar type.
 * @param domain The domain for the $id of the schema.
 * @param stringScalarType A string scalar type.
 */
export function createJsonSchemaForStringScalarType (domain: string, stringScalarType: StringScalarType): AnySchema {
  return {
    $id: `${domain}/${stringScalarType.system}/${stringScalarType.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `String Scalar Type "${stringScalarType.name}"`,
    type: 'string',
    minLength: stringScalarType.minimumLength,
    maxLength: stringScalarType.maximumLength,
    pattern: stringScalarType.regex
  }
}
