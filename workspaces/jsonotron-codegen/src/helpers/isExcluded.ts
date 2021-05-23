import { HelperOptions } from 'handlebars'

/**
 * Renders the content if the context is not found in the given array.
 * @param this The current execution context.
 * @param context The current document/template context.
 * @param options The data associated with the current handlebars command.
 */
export function isExcluded (this: unknown, context: unknown, options: HelperOptions): string {
  if (typeof context === 'string' && typeof options.hash['from'] === 'string' && !options.hash['from'].split(',').includes(context)) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}
