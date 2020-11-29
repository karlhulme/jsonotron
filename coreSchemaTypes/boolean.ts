import { SchemaType } from '../interfaces'

export const boolean: SchemaType = {
  name: 'boolean',
  title: 'Boolean',
  paragraphs: ['A value of either true or false.'],
  examples: [
    { value: true, paragraphs: ['A value of true.'] },
    { value: false, paragraphs: ['A value of false.'] }
  ],
  validTestCases: [true, false],
  invalidTestCases: ['a string', '', null, {}, [], 'true'],
  jsonSchema: {
    type: 'boolean'
  }
}
