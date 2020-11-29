import { SchemaType } from '../interfaces'

export const longString: SchemaType = {
  name: 'longString',
  title: 'Long String',
  paragraphs: [
    'A string of 250 characters or less.',
    'An empty string is valid.'
  ],
  examples: [
    { value: 'A long string that contains a lot of characters', paragraphs: ['An example.'] }
  ],
  validTestCases: ['a'.repeat(250), '', ' ', '!!'],
  invalidTestCases: [123, null, true, {}, [], 'b'.repeat(251)],
  jsonSchema: {
    type: 'string',
    maxLength: 250
  }
}
