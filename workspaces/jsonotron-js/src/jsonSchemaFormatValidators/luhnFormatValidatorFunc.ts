import fastLuhn from 'fast-luhn'

/**
 * Returns true if the given value is in the jsonotron luhn format.
 * @param v The value to test.
 */
export function luhnFormatValidatorFunc (v: string): boolean {
  return fastLuhn(v)
}
