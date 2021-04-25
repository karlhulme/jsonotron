import { commonProperties } from './commonProperties'
import { typeReferenceRegex } from './commonRegex'
import { commonRequires } from './commonRequires'

/**
 * Describes the array type.
 */
export const arrayTypeSchema = {
  $id: 'arrayTypeSchema',
  title: 'Array Type Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...commonProperties,
    elementType: {
      type: 'string',
      pattern: typeReferenceRegex
    },
    minimumLength: {
      type: 'integer'
    },
    maximumLength: {
      type: 'integer'
    },
  },
  required: [
    ...commonRequires
  ]
}
