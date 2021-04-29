import { commonProperties } from './commonProperties'
import { commonRequires } from './commonRequires'

/**
 * A JSON schema for the object type definition.
 */
export const objectTypeDefSchema = {
  $id: 'objectTypeDefSchema',
  title: 'Object Type Def Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...commonProperties
  },
  required: [
    ...commonRequires
  ]
}
