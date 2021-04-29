import { AnySchema } from 'ajv'
import { StringType } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'

/**
 * Creates a JSON schema for the given string scalar type.
 * @param domain The domain for the $id of the schema.
 * @param stringType A string scalar type.
 */
export function createJsonSchemaForStringType (domain: string, stringType: StringType): AnySchema {
  return {
    $id: `${domain}/${stringType.system}/${stringType.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `String Type "${stringType.name}"`,
    type: 'string',
    minLength: stringType.minimumLength,
    maxLength: stringType.maximumLength,
    pattern: stringType.regex
  }
}
