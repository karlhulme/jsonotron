import { EnumType, SchemaType } from 'jsonotron-interfaces'

/**
 * Represents the body of a Jsonoserve /types request. 
 */
export interface JsonoserveTypes {
  enumTypes: EnumType[]
  schemaTypes: SchemaType[]
}
