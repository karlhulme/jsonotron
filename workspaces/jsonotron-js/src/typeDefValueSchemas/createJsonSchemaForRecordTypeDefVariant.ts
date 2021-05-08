import { AnySchema } from 'ajv'
import { RecordTypeDef, RecordTypeDefProperty, RecordTypeDefVariant } from 'jsonotron-interfaces'
import { JSON_SCHEMA_DECLARATION } from './consts'
import { getDomainQualifiedTypeReference } from './getDomainQualifiedTypeReference'

/**
 * Creates a JSON schema for the given record type and record type variant.
 * @param domain The domain for the $id of the schema.
 * @param recordTypeDef A record type.
 * @param variantDef A record type variant.
 */
export function createJsonSchemaForRecordTypeDefVariant (domain: string, recordTypeDef: RecordTypeDef, variantDef: RecordTypeDefVariant): AnySchema {
  const properties: Record<string, unknown> = {}

  const recordTypeProperties: RecordTypeDefProperty[] = []
  
  if (variantDef.includeProperties) {
    recordTypeProperties.push(...recordTypeDef.properties.filter(property => (variantDef.includeProperties as string[]).includes(property.name)))
  }

  if (variantDef.excludeProperties) {
    recordTypeProperties.push(...recordTypeDef.properties.filter(property => !(variantDef.excludeProperties as string[]).includes(property.name)))
  }

  recordTypeProperties.forEach(property => {
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
    $id: `${domain}/${recordTypeDef.system}/${variantDef.name}`,
    $schema: JSON_SCHEMA_DECLARATION,
    title: `Record Type: ${recordTypeDef.name}, Variant: ${variantDef.name}"`,
    type: 'object',
    additionalProperties: false,
    properties,
    required: variantDef.required
  }
}
