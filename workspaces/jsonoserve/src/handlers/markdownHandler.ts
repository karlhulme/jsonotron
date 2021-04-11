import { generateMarkdown } from 'jsonotron-codegen'
import { HandlerProps } from './HandlerProps'

/**
 * Handles a request for markdown.
 * @param props The markdown handler properties.
 */
export async function markdownHandler (props: HandlerProps): Promise<void> {
  if (typeof props.req.query.systems !== 'string') {
    props.res.status(400).send('Must supply query parameter \'systems\' that lists the requested type systems.')
    return
  }

  const systems = props.req.query.systems.split(',').filter(s => s)

  const markdown = generateMarkdown({
    enumTypes: props.enumTypes.filter(e => systems.includes(e.system)),
    schemaTypes: props.schemaTypes.filter(s => systems.includes(s.system))
  })

  props.res.json({
    markdown
  })
}
