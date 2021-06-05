import { Request, RequestHandler, Response } from 'express'
import { RecordFactory, Template } from 'jsonotron-interfaces'
import { parseTypeLibrary, filterTypeLibrary } from 'jsonotron-js'
import { createTemplateProcessor, TemplateProcessorContext, TemplateProcessorFunc } from 'jsonotron-codegen'

/**
 * Represents the properties of a jsonoserve express constructor.
 */
export interface JsonoserveConstructorProps {
  /**
   * The domain to use for any generated JSON schemas.
   */
   domain?: string

   /**
   * An array of resource strings.
   */
  resourceStrings?: string[]

  /**
   * An array of language templates.
   */
  templates?: Template[]

  /**
   * An array of record factories.
   */
  factories?: RecordFactory[]
}

/**
 * Creates a new jsonoserve handler that can be used as an Express route handler.
 * @param props The constructor properties.
 */
export function createJsonoserveExpress (props?: JsonoserveConstructorProps): RequestHandler {
  const typeLibrary = parseTypeLibrary({ domain: props?.domain, resourceStrings: props?.resourceStrings, factories: props?.factories })

  const processors: Record<string, TemplateProcessorFunc> = {}

  props?.templates?.forEach(template => {
    processors[template.name] = createTemplateProcessor(template)
  })

  return function (req: Request, res: Response): void {
    if (req.method !== 'GET') {
      res.status(405).send('Only GET method accepted.')
      return
    }

    if (req.path.length < 2) {
      res.status(404).send('Must include a path.')
      return
    }

    const templateName = req.path.substring(1)

    const processor = processors[templateName]

    if (!processor) {
      res.status(400).send(`Unable to find template processor for "${templateName}".`)
      return
    }

    const systemsParam = req.query.systems as string

    if (typeof systemsParam !== 'string') {
      res.status(400).send('Must specify a systems query parameter.')
      return
    }

    const systems = systemsParam.split(',')

    const context: TemplateProcessorContext = {
      typeLibrary: filterTypeLibrary(typeLibrary, systems),
      generatedDateTime: new Date().toISOString()
    }
  
    const result = processor(context)

    res.send(result)
  }
}
