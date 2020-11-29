import { SchemaType } from '../interfaces'

export const date: SchemaType = {
  name: 'date',
  title: 'Date',
  paragraphs: [
    'A string with the date components arranged using the YYYY-MM-DD pattern.',
    'If the day or month component is a value less than 10 then a leading zero must be included.  This ensures that all stored dates are the same length.'],
  examples: [
    { value: '2007-09-25', paragraphs: ['An example.'] }
  ],
  validTestCases: ['2014-09-15', '2025-10-30'],
  invalidTestCases: [-1, 0, 999999, null, true, 'a house', {}, [], '2014-22-25', '2014-09-75', '2014-02-31'],
  jsonSchema: {
    type: 'string',
    format: 'date'
  }
}
