import { Request, RequestHandler, Response } from 'express'
import { parseTypeLibrary } from 'jsonotron-js'
import {  } from 'jsonotron-codegen'
import { markdownHandler, typescriptHandler } from '../handlers'
import { HandlerFunction } from '../handlers/HandlerFunction'
import { HandlerProps } from '../handlers/HandlerProps'
import { notFoundHandler } from '../handlers/notFoundHandler'

/**
 * Represents the properties of a jsonoserve express constructor.
 */
export interface JsonoserveConstructorProps {
  /**
   * An array of resource strings.
   */
  resourceStrings: string[]

  

  /**
   * The domain to use for any issued JSON schemas.
   */
  domain: string
}

/**
 * Creates a new jsonoserve handler that can be used as an Express route handler.
 * @param props The constructor properties.
 */
export function createJsonoserveExpress (props: JsonoserveConstructorProps): RequestHandler {
  const resources = parseTypeLibrary({ resourceStrings: props.resourceStrings })

  return async (req: Request, res: Response): Promise<void> => {
    const handlerProps: HandlerProps = {
      domain: props.domain,
      req,
      res,
      enumTypes: resources.enumTypes,
      schemaTypes: []
    }

    const handler = chooseHandler(req)

    await handler(handlerProps)
  }
}

/**
 * Selects a handler function based on the request path
 * and verb.  If a target handler is not found then the
 * notFoundHandler is returned instead.
 * @param req An express request object.
 */
function chooseHandler (req: Request): HandlerFunction {
  if (req.method === 'GET' && req.path === '/markdown') {
    return markdownHandler
  }

  if (req.method === 'GET' && req.path === '/typescript') {
    return typescriptHandler
  }

  return notFoundHandler
}
