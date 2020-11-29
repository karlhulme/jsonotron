import { SchemaType } from '../interfaces'

export const hugeString: SchemaType = {
  name: 'hugeString',
  title: 'Huge String',
  paragraphs: [
    'A string of 4000 characters or less.',
    'An empty string is valid.'
  ],
  examples: [
    { value: 'A very long paragraph about an interesting subject...', paragraphs: ['An example.'] }
  ],
  validTestCases: ['a'.repeat(4000), '', ' ', '!!'],
  invalidTestCases: [123, null, true, {}, [], 'b'.repeat(4001)],
  jsonSchema: {
    type: 'string',
    maxLength: 4000
  }
}
