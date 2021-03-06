import { Request, Response } from 'express'
import { Jsonotron } from 'jsonotron-js'

/**
 * Handles a request for a type map.
 * @param req An express request.
 * @param res An express response.
 * @param jsonotron A jsonotron.
 */
export function getMapHandler (req: Request, res: Response, jsonotron: Jsonotron): void {
  if (typeof req.query.n !== 'string') {
    res.status(400).send('Must supply query parameter \'n\' that lists the requested type systems.')
    return
  }

  const systems = (req.query.n as string).split(',').filter(s => s)

  const typeMap = jsonotron.getTypeMap(systems)

  res.json({
    typeMap
  })
}
