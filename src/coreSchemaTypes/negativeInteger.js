export const negativeInteger = {
  name: 'negativeInteger',
  title: 'Negative Integer',
  paragraphs: ['A whole number that is equal to -1 or less.'],
  examples: [
    { value: -9, paragraphs: ['An example.'] }
  ],
  validTestCases: [-1, -25],
  invalidTestCases: ['a string', '', null, true, {}, [], 25, 0],
  jsonSchema: {
    type: 'integer',
    maximum: -1
  }
}
