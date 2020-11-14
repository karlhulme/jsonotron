import luxon from 'luxon'

export const dateTimeUtc = {
  name: 'dateTimeUtc',
  title: 'Date & Time UTC',
  paragraphs: [
    'A string with the date and time components arranged using the YYYY-MM-DDTHH:mm:ssZ pattern.',
    'Leading zeroes must be used to ensure that all values are the same length.'
  ],
  examples: [
    { value: '2014-09-15T23:59:25Z', paragraphs: ['An example.'] }
  ],
  validTestCases: ['2014-09-15T23:14:25Z', '2025-10-30T02:59:10Z'],
  invalidTestCases: [
    -1, 0, 999999, null, true, 'a house', {}, [],
    '2014-22-25T23:14:25Z',
    '2014-09-75T23:14:25Z',
    '2014-09-75T23:84:25Z',
    '2014-02-31T13:00:00Z',
    '2014-02-31T13:00:00+01:00'
  ],
  jsonSchema: { type: 'string', pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$', format: 'dateTimeUtc.luxon' },
  parsers: {
    luxon: v => luxon.DateTime.fromFormat(v, 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'').isValid
  }
}
