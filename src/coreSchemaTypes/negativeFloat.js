export const negativeFloat = {
  name: 'negativeFloat',
  title: 'Negative Floating Point Number',
  paragraphs: ['A number with an integral and decimal part that is less than zero.'],
  examples: [
    { value: -21.09, paragraphs: ['An example.'] }
  ],
  validTestCases: [-0.001, -1, -1456.24],
  invalidTestCases: ['a string', '', null, true, {}, [], 34.56, 1, 0],
  jsonSchema: {
    type: 'number',
    exclusiveMaximum: 0
  }
}
