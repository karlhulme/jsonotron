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
    type: 'object'
  }
}
