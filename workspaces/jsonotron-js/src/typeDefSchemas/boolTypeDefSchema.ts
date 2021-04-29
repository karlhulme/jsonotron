import { commonProperties } from './commonProperties'
import { commonRequires } from './commonRequires'

/**
 * A JSON schema for the bool type definition.
 */
export const boolTypeDefSchema = {
  $id: 'boolTypeDefSchema',
  title: 'Boolean Type Def Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...commonProperties
  },
  required: [
    ...commonRequires
  ]
}
