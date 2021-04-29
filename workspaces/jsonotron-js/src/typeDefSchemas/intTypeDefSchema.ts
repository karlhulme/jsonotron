import { commonProperties } from './commonProperties'
import { commonRequires } from './commonRequires'

/**
 * A JSON schema for the int type definition.
 */
export const intTypeDefSchema = {
  $id: 'intTypeDefSchema',
  title: 'Int Type Def Schema',
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
