import { SchemaType } from '../interfaces'

export const positiveIntegerOrZero: SchemaType = {
  name: 'positiveIntegerOrZero',
  title: 'Positive Integer or Zero',
  paragraphs: ['A whole number that is equal to zero or greater.'],
  examples: [
    { value: 21, paragraphs: ['An example.'] },
    { value: 0, paragraphs: ['An example.'] }
  ],
  validTestCases: [0, 1, 25],
  invalidTestCases: ['a string', '', null, true, {}, [], -25],
  jsonSchema: {
    type: 'integer',
    minimum: 0
  }
}
