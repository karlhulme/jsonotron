import luxon from 'luxon'

export const dateTimeLocal = {
  name: 'dateTimeLocal',
  title: 'Date & Time Local',
  paragraphs: [
    'An object that captures a date and time in a specific time zone.',
    'The `dateTime` property records the date and time in the YYYY-MM-DDTHH:mm:ss+Z format.  Notice that the pattern always has a T between the date and time components and that the time zone is always expressed with 2 digits for hours and 2 digits for minutes.',
    'The `timeZone` property records where in the world the time applies.  It is a %%timeZone%% value.',
    'The `timestamp` property records when the date and time was captured.  It is a %%timestamp%% value.  This is useful for advanced scenarios where the behaviour of a time zone is changed at some point in the future.  Knowing when the capture was made allows you to pinpoint the rules at the point and then convert to the prevailing rules.',
    'Leading zeroes must be used to ensure that all values are the same length.'
  ],
  examples: [
    {
      value: { dateTime: '2010-06-08T05:30:12+01:00', timeZone: 'europe/london', captured: 1563119540628 },
      paragraphs: [
        'The europe/london time zone operates at +00:00 during the winter and +01:00 during the summer.  In this example we can see the value is in the summer because of the +01:00 suffix.'
      ]
    }
  ],
  validTestCases: [
    { dateTime: '2010-02-04T05:30:12+01:00', timeZone: 'europe/london', captured: 1563119540628 },
    { dateTime: '2011-04-30T16:41:00+00:00', timeZone: 'europe/london', captured: 1563119547583 }
  ],
  invalidTestCases: [
    null, true, 12, 'a string', [], {},
    { dateTime: '19500101123456', timeZone: 'europe/london', captured: 1563119540628 },
    { dateTime: '2010-02-04T05:30:12+01:00', timeZone: 'madeup', captured: 1563119540628 },
    { dateTime: '2010-02-04T05:30:12+0:00', timeZone: 'europe/london', captured: 1563119540628 },
    { dateTime: '2010-02-04T05:30:12Z', timeZone: 'europe/london', captured: 1563119540628 }
  ],
  jsonSchema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      dateTime: { type: 'string', pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}[+][0-9]{2}:[0-9]{2}$', format: 'dateTimeLocal.luxon' },
      timeZone: { $ref: '#/definitions/timeZone' },
      captured: { $ref: '#/definitions/timestamp' }
    },
    required: ['dateTime', 'timeZone', 'captured']
  },
  parsers: {
    luxon: v => luxon.DateTime.fromFormat(v, 'yyyy-MM-dd\'T\'HH:mm:ssZZ').isValid
  }
}
