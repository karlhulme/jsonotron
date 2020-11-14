export const string = {
  name: 'string',
  title: 'String',
  paragraphs: [
    'A string of characters of any length.',
    'Care should be taken not to supply a string of such great length that the underlying data store cannot save it.',
    'An empty string is valid.'],
  examples: [
    { value: 'A string', paragraphs: ['An example.'] }
  ],
  validTestCases: ['any string', '', ' ', '!!'],
  invalidTestCases: [123, null, true, {}, []],
  jsonSchema: {
    type: 'string'
  }
}
