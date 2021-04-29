import { commonProperties } from './commonProperties'
import { commonRequires } from './commonRequires'

/**
 * A JSON schema for the float type definition.
 */
export const floatTypeDefSchema = {
  $id: 'floatTypeDefSchema',
  title: 'Float Type Def Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...commonProperties,
    minimum: {
      type: 'number'
    },
    isMinimumExclusive: {
      type: 'boolean'
    },
    maximum: {
      type: 'number'
    },
    isMaximumExclusive: {
      type: 'boolean'
    }
  },
  required: [
    ...commonRequires,
    'minimum',
    'maximum'
  ]
}
