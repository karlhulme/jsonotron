import { commonProperties } from './commonProperties'
import { commonRequires } from './commonRequires'

/**
 * Describes the string scalar type.
 */
export const stringScalarTypeSchema = {
  $id: 'stringScalarTypeSchema',
  title: 'String Scalar Type Schema',
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
  },
  required: [
    ...commonRequires,
    'maximumLength'
  ]
}
