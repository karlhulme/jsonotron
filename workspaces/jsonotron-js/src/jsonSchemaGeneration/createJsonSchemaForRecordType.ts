import { AnySchema } from 'ajv'
import { RecordType } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'
import { getDomainQualifiedTypeReference } from './getDomainQualifiedTypeReference'

/**
 * Creates a JSON schema for the given record type.
 * @param domain The domain for the $id of the schema.
 * @param recordType A record type.
 */
export function createJsonSchemaForRecordType (domain: string, recordType: RecordType): AnySchema {
  const properties: Record<string, unknown> = {}

  recordType.properties.forEach(property => {
    if (property.isArray) {
      properties[property.name] = {
        type: 'array',
        items: {
          '$ref': getDomainQualifiedTypeReference(domain, recordType.system, property.propertyType)
        }
      }
    } else {
      properties[property.name] = {
        '$ref': getDomainQualifiedTypeReference(domain, recordType.system, property.propertyType)
      }
    }
  })

  return {
    $id: `${domain}/${recordType.system}/${recordType.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Record Type "${recordType.name}"`,
    type: 'object',
    properties,
    required: recordType.properties.filter(property => property.isRequired).map(property => property.name)
  }
}
