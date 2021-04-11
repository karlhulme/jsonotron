import { HandlerProps } from './HandlerProps'

export type HandlerFunction = (props: HandlerProps) => Promise<void>
