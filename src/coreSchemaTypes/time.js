export const time = {
  name: 'time',
  title: 'Time',
  paragraphs: [
    'A string with the time components arranged using the HH:mm:ss pattern.',
    'If the hours, minutes or seconds component is a value less than 10 then a leading zero must be included.  This ensures that all stored times are the same length.'
  ],
  examples: [
    { value: '23:14:56', paragraphs: ['An example.'] }
  ],
  validTestCases: ['23:14:25', '02:59:10'],
  invalidTestCases: [-1, 0, 999999, null, true, 'a house', {}, [], '33:14:25', '23:84:25', '23:24:95', '29:30:00', '8:00:00'],
  jsonSchema: {
    type: 'string',
    format: 'time'
  }
}
