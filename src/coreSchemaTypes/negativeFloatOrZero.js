export const negativeFloatOrZero = {
  name: 'negativeFloatOrZero',
  title: 'Negative Floating Point Number or Zero',
  paragraphs: ['A number with an integral and decimal part that is less than or equal to zero.'],
  examples: [
    { value: -6.16, paragraphs: ['An example.'] },
    { value: 0, paragraphs: ['An example.'] }
  ],
  validTestCases: [0, -0.001, -1, -1456.24],
  invalidTestCases: ['a string', '', null, true, {}, [], 34.56, 1],
  jsonSchema: {
    type: 'number',
    maximum: 0
  }
}
