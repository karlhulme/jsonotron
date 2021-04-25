import { identifierRegex } from './commonRegex'

/**
 * Describes the properties that are common to all the types.
 */
export const commonProperties = {
  kind: {
    enum: ['enumScalar', 'intScalar', 'floatScalar', 'boolScalar', 'stringScalar', 'array', 'record', 'object']
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
