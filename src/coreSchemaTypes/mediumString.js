export const mediumString = {
  name: 'mediumString',
  title: 'Medium String',
  paragraphs: [
    'A string of 50 characters or less.',
    'An empty string is valid.'
  ],
  examples: [
    { value: 'A string that contains some characters', paragraphs: ['An example.'] }
  ],
  validTestCases: ['a'.repeat(50), '', ' ', '!!'],
  invalidTestCases: [123, null, true, {}, [], 'a'.repeat(51)],
  jsonSchema: {
    type: 'string',
    maxLength: 50
  }
}
