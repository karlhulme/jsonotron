import { commonProperties } from './commonProperties'
import { commonRequires } from './commonRequires'

/**
 * Describes the int scalar type.
 */
export const intTypeSchema = {
  $id: 'intTypeSchema',
  title: 'Int Type Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...commonProperties,
    minimum: {
      type: 'integer'
    },
    maximum: {
      type: 'integer'
    },
  },
  required: [
    ...commonRequires,
    'minimum',
    'maximum'
  ]
}
