import { commonProperties } from './commonProperties'
import { typeReferenceRegex } from './commonRegex'
import { commonRequires } from './commonRequires'

/**
 * Describes the enum scalar type.
 */
export const enumScalarTypeSchema = {
  $id: 'enumScalarTypeSchema',
  title: 'Enum Scalar Type Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...commonProperties,
    items: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
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
