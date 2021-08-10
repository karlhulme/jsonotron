import { identifierRegex } from './commonRegex'

/**
 * Describes the properties that are common to all the type definitions.
 */
export const commonProperties = {
  kind: {
    enum: ['bool', 'enum', 'float', 'int', 'object', 'record', 'string']
  },
  system: {
    type: 'string',
    pattern: identifierRegex
  },
  name: {
    type: 'string',
    pattern: identifierRegex
  },
  summary: {
    type: 'string'
  },
  deprecated: {
    type: 'string'
  },
  tags: {
    type: 'array',
    items: {
      type: 'string'
    }
  },
  labels: {
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: false,
      properties: {
        name: {
          type: 'string'
        },
        value: {
          type: 'string'
        }
      },
      required: [
        'name',
        'value'
      ]
    }
  }
}
