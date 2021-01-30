import { Request, RequestHandler, Response } from 'express'
import { JsonotronSystem } from '../interfaces'
import { parseYaml } from '../utils'

/**
 * Regex to match system urls, e.g. /systems/https%3A%2F%2Fjsonotron.org%2Fjss
 */
const systemRegex = /^\/systems\/[a-zA-Z0-9\-_:%.]+$/

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
  // check all types can be parsed
  const jsonotronTypes = props.types.map(t => parseYaml(t))

  // get unique systems
  const jsonotronSystems: JsonotronSystem[] = []

  for (const type of jsonotronTypes) {
    if (jsonotronSystems.findIndex(sys => sys.domain === type.domain && sys.system === type.system) === -1) {
      jsonotronSystems.push({ domain: type.domain, system: type.system })
    }
  }

  return async (req: Request, res: Response): Promise<void> => {
    if (req.url === '/systems') {
      res.json({
        systems: jsonotronSystems
      })
    } else if (systemRegex.test(req.url)) {
      const requestedDomainAndSystem = decodeURIComponent(req.url.replace('/systems/', ''))

      res.json({
        types: jsonotronTypes
          .filter(type => requestedDomainAndSystem === `${type.domain}/${type.system}`)
          .map(type => ({ domain: type.domain, system: type.system, name: type.name, kind: type.kind, definition: JSON.stringify(type) }))
      })
    } else {
      res.status(404).end()
    }
  }
}
