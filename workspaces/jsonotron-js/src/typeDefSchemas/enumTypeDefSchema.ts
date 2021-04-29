import { commonProperties } from './commonProperties'
import { typeReferenceRegex } from './commonRegex'
import { commonRequires } from './commonRequires'

/**
 * A JSON schema for the enum type definition.
 */
export const enumTypeDefSchema = {
  $id: 'enumTypeDefSchema',
  title: 'Enum Type Def Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...commonProperties,
    items: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          value: {
            type: 'string',
            minLength: 1,
            maxLength: 250
          },
          text: {
            type: 'string'
          },
          deprecated: {
            type: 'string'
          },
          symbol: {
            type: 'string'
          },
          data: {},
          summary: {
            type: 'string'
          }
        },
        required: [
          'value',
          'text'
        ]
      }
    },
    dataType: {
      type: 'string',
      pattern: typeReferenceRegex
    }
  },
  required: [
    ...commonRequires,
    'items'
  ]
}
