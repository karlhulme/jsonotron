import { HandlerProps } from './HandlerProps'

export async function notFoundHandler (props: HandlerProps): Promise<void> {
  props.res.status(404).send()
}
