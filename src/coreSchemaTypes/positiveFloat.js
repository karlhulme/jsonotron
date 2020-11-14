export const positiveFloat = {
  name: 'positiveFloat',
  title: 'Positive Floating Point Number',
  paragraphs: ['A number with an integral and decimal part that is greater than zero.'],
  examples: [
    { value: 12.34, paragraphs: ['An example.'] }
  ],
  validTestCases: [0.001, 1, 1456.24],
  invalidTestCases: ['a string', '', null, true, {}, [], -34.56, -1, 0],
  jsonSchema: {
    type: 'number',
    exclusiveMinimum: 0
  }
}
