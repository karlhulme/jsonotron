import { expect, test } from '@jest/globals'
import {
  dateTimeLocalFormatValidatorFunc,
  dateTimeUtcFormatValidatorFunc,
  luhnFormatValidatorFunc
} from '../src/jsonSchemaFormatValidators'

test('Local date times can be validated.', () => {
  expect(dateTimeLocalFormatValidatorFunc('2020-11-29T12:00:00+01:00')).toEqual(true)

  // missing timezone
  expect(dateTimeLocalFormatValidatorFunc('2020-11-29T12:00:00Z')).toEqual(false)
  // invalid timezone
  expect(dateTimeLocalFormatValidatorFunc('2020-11-29T12:00:00+1:00')).toEqual(false)
  // invalid month
  expect(dateTimeLocalFormatValidatorFunc('2020-13-29T12:00:00+01:00')).toEqual(false)
})

test('UTC date times can be validated.', () => {
  expect(dateTimeUtcFormatValidatorFunc('2020-11-29T12:00:00Z')).toEqual(true)

  // timezone present
  expect(dateTimeUtcFormatValidatorFunc('2020-13-29T12:00:00+01:00')).toEqual(false)
  // invalid month
  expect(dateTimeUtcFormatValidatorFunc('2020-13-29T12:00:00Z')).toEqual(false)
})

test('luhn values can be validated.', () => {
  expect(luhnFormatValidatorFunc('4111111111111111')).toEqual(true)

  // invalid value
  expect(luhnFormatValidatorFunc('1234123412341234')).toEqual(false)
})
