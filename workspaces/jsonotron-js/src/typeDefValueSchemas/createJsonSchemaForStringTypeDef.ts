import { AnySchema } from 'ajv'
import { StringTypeDef } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON schema for the given string type.
 * @param domain The domain for the $id of the schema.
 * @param stringTypeDef A string scalar type.
 */
export function createJsonSchemaForStringTypeDef (domain: string, stringTypeDef: StringTypeDef): AnySchema {
  return {
    $id: `${domain}/${stringTypeDef.system}/${stringTypeDef.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `String Type: ${stringTypeDef.name}`,
    type: 'string',
    minLength: stringTypeDef.minimumLength,
    maxLength: stringTypeDef.maximumLength,
    pattern: stringTypeDef.regex
  }
}
