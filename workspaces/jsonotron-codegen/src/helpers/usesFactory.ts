import { HelperOptions } from 'handlebars'

/**
 * Includes the content if the context uses a factory with a given name.
 * @param this The current execution context.
 * @param context The current document/template context.
 * @param options The data associated with the current handlebars command.
 */
export function usesFactory (this: unknown, context: unknown, options: HelperOptions): string {
  if (context && typeof context === 'object' && Array.isArray((context as Record<string, unknown>).factories) && typeof options.hash['name'] === 'string' && ((context as Record<string, unknown>).factories as string[]).includes(options.hash['name'])) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}
