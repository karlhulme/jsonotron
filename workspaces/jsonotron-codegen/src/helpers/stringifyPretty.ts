/**
 * Stringifies the given value using newlines
 * and 2 character indentation.
 * @param value Any value.
 */
 export function stringifyPretty (value: unknown): string {
  return JSON.stringify(value, null, 2);
}
