import { Request, RequestHandler, Response } from 'express'
import { Jsonotron } from 'jsonotron-js'
import { getTypesHandler } from '../handlers'

/**
 * Represents the properties of a sengi express constructor.
 */
export interface JsonoserveConstructorProps {
  types: string[]
}

/**
 * Creates a new jsonoserve handler that can be used as an Express route handler.
 * @param props The constructor properties.
 */
export function createJsonoserveExpress (props: JsonoserveConstructorProps): RequestHandler {
  const jsonotron = new Jsonotron({ types: props.types })

  return async (req: Request, res: Response): Promise<void> => {
    if (req.method === 'GET' && req.path === '/types') {
      getTypesHandler(req, res, jsonotron)
    } else {
      res.status(404).end()
    }
  }
}
