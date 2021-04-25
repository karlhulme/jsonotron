import { commonProperties } from './commonProperties'
import { commonRequires } from './commonRequires'

/**
 * Describes the object type.
 */
export const objectTypeSchema = {
  $id: 'objectTypeSchema',
  title: 'Object Type Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...commonProperties
  },
  required: [
    ...commonRequires
  ]
}
