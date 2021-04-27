import { TemplateProcessorContext } from './TemplateProcessorContext'

/**
 * A function that accepts a template processing context and returns
 * a generated string.
 */
export type TemplateProcessorFunc = (context: TemplateProcessorContext) => string
