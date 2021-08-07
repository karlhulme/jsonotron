import { HelperOptions } from 'handlebars'

/**
 * Includes the content if the context is not tagged with a given value.
 * @param this The current execution context.
 * @param context The current document/template context.
 * @param options The data associated with the current handlebars command.
 */
export function isNotTagged (this: unknown, context: unknown, options: HelperOptions): string {
  if (!Array.isArray(context) || typeof options.hash['with'] !== 'string' || !context.includes(options.hash['with'])) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}
