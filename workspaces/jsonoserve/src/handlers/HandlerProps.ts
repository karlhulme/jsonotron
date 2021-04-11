import { Request, Response } from 'express'
import { EnumType, SchemaType } from 'jsonotron-interfaces'

/**
 * Defines the properties of the typescript handler.
 */
export interface HandlerProps {
  /**
   * An express request.
   */
  req: Request

  /**
   * An express response.
   */
  res: Response

  /**
   * An array of validated and parsed enum types.
   */
  enumTypes: EnumType[]

  /**
   * An array of validated and parsed schema types.
   */
  schemaTypes: SchemaType[]
}
