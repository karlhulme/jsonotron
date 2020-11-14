export const float = {
  name: 'float',
  title: 'Floating Point Number',
  paragraphs: ['A number with an integral and decimal part.'],
  examples: [
    { value: 3.14, paragraphs: ['An example.'] }
  ],
  validTestCases: [-34.56, -1, 0, 1, 1456.24],
  invalidTestCases: ['a string', '', null, true, {}, []],
  jsonSchema: {
    type: 'number'
  }
}
