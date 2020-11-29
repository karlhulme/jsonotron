import { SchemaType } from '../interfaces'
import fastLuhn from 'fast-luhn'

export const paymentCardNo: SchemaType = {
  name: 'paymentCardNo',
  title: 'Payment Card Number',
  paragraphs: [
    'A value that uniquely identifies a payment card, such as a credit or debit card.',
    'Any stored value will need to satisfy the LUHN algorithm.'
  ],
  examples: [
    { value: '4111111111111111', paragraphs: ['An example.'] }
  ],
  validTestCases: ['4111111111111111'],
  invalidTestCases: [-1, 0, 999999, null, true, 'a house', {}, [], '1234123412341234'],
  jsonSchema: { type: 'string', format: 'paymentCardNo.luhn' },
  parsers: {
    luhn: (v: string): boolean => fastLuhn(v)
  }
}
