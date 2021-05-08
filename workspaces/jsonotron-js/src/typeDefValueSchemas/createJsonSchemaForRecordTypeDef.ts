import { AnySchema } from 'ajv'
import { RecordTypeDef } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'
import { getDomainQualifiedTypeReference } from './getDomainQualifiedTypeReference'

/**
 * Creates a JSON schema for the given record type.
 * @param domain The domain for the $id of the schema.
 * @param recordTypeDef A record type.
 */
export function createJsonSchemaForRecordTypeDef (domain: string, recordTypeDef: RecordTypeDef): AnySchema {
  const properties: Record<string, unknown> = {}

  recordTypeDef.properties.forEach(property => {
    if (property.isArray) {
      properties[property.name] = {
        type: 'array',
        items: {
          '$ref': getDomainQualifiedTypeReference(domain, recordTypeDef.system, property.propertyType)
        }
      }
    } else {
      properties[property.name] = {
        '$ref': getDomainQualifiedTypeReference(domain, recordTypeDef.system, property.propertyType)
      }
    }
  })

  return {
    $id: `${domain}/${recordTypeDef.system}/${recordTypeDef.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Record Type: ${recordTypeDef.name}`,
    type: 'object',
    additionalProperties: false,
    properties,
    required: recordTypeDef.required
  }
}
