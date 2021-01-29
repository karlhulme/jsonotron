import { DateTime } from 'luxon'

/**
 * Returns true if the given value is in the jsonotron date time local format.
 * @param v The value to test.
 */
export function dateTimeLocalFormatValidatorFunc (v: string): boolean {
  return v.length === 25 && DateTime.fromFormat(v, 'yyyy-MM-dd\'T\'HH:mm:ssZZ').isValid
}
