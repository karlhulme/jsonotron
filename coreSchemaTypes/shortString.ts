import { SchemaType } from '../interfaces'

export const shortString: SchemaType = {
  name: 'shortString',
  title: 'Short String',
  paragraphs: [
    'A string of 20 characters or less.',
    'An empty string is valid.'
  ],
  examples: [
    { value: 'A terse string', paragraphs: ['A short text string.'] }
  ],
  validTestCases: ['my short string', 'abcdefghijklmnopqrst', '', ' ', '!!'],
  invalidTestCases: [123, null, true, {}, [], 'abcdefghijklmnopqrstu'],
  jsonSchema: {
    type: 'string',
    maxLength: 20
  }
}
