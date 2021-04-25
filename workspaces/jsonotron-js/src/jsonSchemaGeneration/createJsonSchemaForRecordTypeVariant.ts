import { AnySchema } from 'ajv'
import { RecordType, RecordTypeVariant } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'
import { getDomainQualifiedTypeReference } from './getDomainQualifiedTypeReference'

/**
 * Creates a JSON schema for the given record type and record type variant.
 * @param domain The domain for the $id of the schema.
 * @param recordType A record type.
 * @param variant A record type variant.
 */
export function createJsonSchemaForRecordTypeVariant (domain: string, recordType: RecordType, variant: RecordTypeVariant): AnySchema {
  const properties: Record<string, unknown> = {}

  const recordTypeProperties = variant.includeProperties
    ? recordType.properties.filter(property => (variant.includeProperties as string[]).includes(property.name))
    : recordType.properties.filter(property => !(variant.excludeProperties as string[]).includes(property.name))

    recordTypeProperties.forEach(property => {
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
    $id: `${domain}/${recordType.system}/${variant.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Record Type (Variant) "${variant.name}"`,
    type: 'object',
    properties,
    required: variant.partial
      ? []
      : recordType.properties.filter(property => property.isRequired).map(property => property.name)
  }
}
