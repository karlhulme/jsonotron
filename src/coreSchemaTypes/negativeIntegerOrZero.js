export const negativeIntegerOrZero = {
  name: 'negativeIntegerOrZero',
  title: 'Negative Integer or Zero',
  paragraphs: ['A whole number that is equal to zero or less.'],
  examples: [
    { value: -15, paragraphs: ['An example.'] },
    { value: 0, paragraphs: ['An example.'] }
  ],
  validTestCases: [0, -1, -25],
  invalidTestCases: ['a string', '', null, true, {}, [], 25],
  jsonSchema: {
    type: 'integer',
    maximum: 0
  }
}
