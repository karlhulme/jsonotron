import { SchemaType } from '../interfaces'

export const jsonPointer: SchemaType = {
  name: 'jsonPointer',
  title: 'JSON Pointer',
  paragraphs: ['A JSON pointer.'],
  examples: [
    { value: '/root/tree/branch/leaf', paragraphs: ['An example.'] }
  ],
  validTestCases: ['/root/tree/leaf', '/root/tree/1/leaf'],
  invalidTestCases: [123, null, true, {}, [], 'invalid.path', '#/path'],
  jsonSchema: {
    type: 'string',
    format: 'json-pointer'
  }
}
