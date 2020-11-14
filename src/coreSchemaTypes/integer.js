export const integer = {
  name: 'integer',
  title: 'Integer',
  paragraphs: ['A whole number.'],
  examples: [
    { value: 365, paragraphs: ['An example.'] }
  ],
  validTestCases: [-25, 0, 25],
  invalidTestCases: ['a string', '', null, true, {}, []],
  jsonSchema: {
    type: 'integer'
  }
}
