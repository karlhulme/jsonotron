import { commonProperties } from './commonProperties'
import { commonRequires } from './commonRequires'

/**
 * Describes the float scalar type.
 */
export const floatTypeSchema = {
  $id: 'floatScalarTypeSchema',
  title: 'Float Scalar Type Schema',
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
