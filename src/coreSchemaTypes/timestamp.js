export const timestamp = {
  name: 'timestamp',
  title: 'Timestamp',
  paragraphs: ['The number of milliseconds that have elapsed since 00:00:00 Thursday, 1 January 1970.'],
  examples: [
    { value: 1595354428000, paragraphs: ['An example.'] }
  ],
  validTestCases: [0, 123, 1595354428000],
  invalidTestCases: [-25, 15.5, null, true, 'string', {}, []],
  jsonSchema: {
    type: 'integer',
    minimum: 0
  }
}
