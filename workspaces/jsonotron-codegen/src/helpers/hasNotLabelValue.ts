import { HelperOptions } from 'handlebars'

/**
 * Includes the content if the jsonotron type is not assigned a label with a given name and value.
 * @param this The current execution context.
 * @param context The current document/template context.
 * @param options The data associated with the current handlebars command.
 */
export function hasNotLabelValue (this: unknown, context: unknown, options: HelperOptions): string {
  if (!context || typeof context !== 'object' || !Array.isArray((context as Record<string, unknown>).labels) || typeof options.hash['name'] !== 'string' || typeof options.hash['value'] !== 'string' || ((context as Record<string, unknown>).labels as { name: string, value: string }[]).findIndex(l => l.name === options.hash['name'] && l.value === options.hash['value']) === -1) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}
