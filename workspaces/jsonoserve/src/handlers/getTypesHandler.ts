import { Request, Response } from 'express'
import { Jsonotron } from 'jsonotron-js'

/**
 * Handles a request for a set of types covering enum types,
 * schema types and a corresponding type map.
 * @param req An express request.
 * @param res An express response.
 * @param jsonotron A jsonotron.
 */
export function getTypesHandler (req: Request, res: Response, jsonotron: Jsonotron): void {
  if (typeof req.query.n !== 'string') {
    res.status(400).send('Must supply query parameter \'n\' that lists the requested type systems.')
    return
  }

  const systems = (req.query.n as string).split(',').filter(s => s)

  const enumTypes = jsonotron.getEnumTypes(systems)
  const schemaTypes = jsonotron.getSchemaTypes(systems)

  res.json({
    enumTypes,
    schemaTypes
  })
}
