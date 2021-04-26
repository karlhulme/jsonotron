import { commonProperties } from './commonProperties'
import { commonRequires } from './commonRequires'

/**
 * Describes the string scalar type.
 */
export const stringTypeSchema = {
  $id: 'stringTypeSchema',
  title: 'String Type Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...commonProperties,
    minimumLength: {
      type: 'integer',
      minimum: 0
    },
    maximumLength: {
      type: 'integer',
      minimum: 0
    },
    regex: {
      type: 'string'
    },
    validTestCases: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          value: {
            type: 'string'
          },
          summary: {
            type: 'string'
          }
        },
        required: [
          'value'
        ]
      }
    },
    invalidTestCases: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          value: {
            type: 'string'
          },
          summary: {
            type: 'string'
          }
        },
        required: [
          'value'
        ]
      }
    }
  },
  required: [
    ...commonRequires,
    'maximumLength'
  ]
}
