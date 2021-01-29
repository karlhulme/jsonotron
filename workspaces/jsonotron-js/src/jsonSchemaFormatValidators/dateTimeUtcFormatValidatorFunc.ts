import { DateTime } from 'luxon'

/**
 * Returns true if the given value is in the jsonotron date time utc format.
 * @param v The value to test.
 */
export function dateTimeUtcFormatValidatorFunc (v: string): boolean {
  return v.length === 20 && DateTime.fromFormat(v, 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'').isValid
}
