export const positiveInteger = {
  name: 'positiveInteger',
  title: 'Positive Integer',
  paragraphs: ['A whole number that is equal to 1 or greater.'],
  examples: [
    { value: 7, paragraphs: ['An example.'] }
  ],
  validTestCases: [1, 25],
  invalidTestCases: ['a string', '', null, true, {}, [], -25, 0],
  jsonSchema: {
    type: 'integer',
    minimum: 1
  }
}
