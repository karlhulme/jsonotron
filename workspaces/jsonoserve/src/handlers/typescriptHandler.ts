import { generateTypescript } from 'jsonotron-codegen'
import { HandlerProps } from './HandlerProps'

/**
 * Handles a request for typescript.
 * @param props The typescipt handler properties.
 */
export async function typescriptHandler (props: HandlerProps): Promise<void> {
  if (typeof props.req.query.systems !== 'string') {
    props.res.status(400).send('Must supply query parameter \'systems\' that lists the requested type systems.')
    return
  }

  const domain = props.req.query.domain
    ? decodeURIComponent(props.req.query.domain as string)
    : 'https://jsonotron.org'

  const systems = props.req.query.systems.split(',').filter(s => s)

  const typescript = generateTypescript({
    domain,
    enumTypes: props.enumTypes.filter(e => systems.includes(e.system)),
    schemaTypes: props.schemaTypes.filter(s => systems.includes(s.system))
  })

  props.res.json({
    typescript
  })
}
