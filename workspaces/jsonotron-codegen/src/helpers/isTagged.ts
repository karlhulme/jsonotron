import { HelperOptions } from 'handlebars'

/**
 * Converts the given value to a code token in uppercase.
 * @param value Any string value.
 */
export function isTagged (this: unknown, context: unknown, options: HelperOptions): string {
  if (Array.isArray(context) && typeof options.hash['with'] === 'string' && context.includes(options.hash['with'])) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}
