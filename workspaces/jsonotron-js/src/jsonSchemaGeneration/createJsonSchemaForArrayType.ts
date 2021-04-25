import { AnySchema } from 'ajv'
import { ArrayType } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'
import { getDomainQualifiedTypeReference } from './getDomainQualifiedTypeReference'

/**
 * Creates a JSON schema for the given array type.
 * @param domain The domain for the $id of the schema.
 * @param arrayType An array type.
 */
export function createJsonSchemaForArrayType (domain: string, arrayType: ArrayType): AnySchema {
  return {
    $id: `${domain}/${arrayType.system}/${arrayType.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Array Type "${arrayType.name}"`,
    type: 'array',
    minItems: arrayType.minimumLength,
    maxItems: arrayType.maximumLength,
    items: {
      $ref: getDomainQualifiedTypeReference(domain, arrayType.system, arrayType.elementType)
    }
  }
}
