import { HelperOptions } from 'handlebars'

/**
 * Includes the content if the context is not tagged with a given value.
 * @param this The current execution context.
 * @param context The current document/template context.
 * @param options The data associated with the current handlebars command.
 */
export function isNotTagged (this: unknown, context: unknown, options: HelperOptions): string {
  if (!context || typeof context !== 'object' || !Array.isArray((context as Record<string, unknown>).tags) || typeof options.hash['with'] !== 'string' || !((context as Record<string, unknown>).tags as string[]).includes(options.hash['with'])) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}
