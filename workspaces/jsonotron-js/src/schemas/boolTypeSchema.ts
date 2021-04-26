import { commonProperties } from './commonProperties'
import { commonRequires } from './commonRequires'

/**
 * Describes the bool scalar type.
 */
export const boolTypeSchema = {
  $id: 'boolTypeSchema',
  title: 'Boolean Type Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...commonProperties
  },
  required: [
    ...commonRequires
  ]
}
