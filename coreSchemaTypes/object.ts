import { SchemaType } from '../interfaces'

export const object: SchemaType = {
  name: 'object',
  title: 'Object',
  paragraphs: [
    'A JSON object.',
    'The underlying data store may impose a limit of the depth of the JSON object.',
    'You cannot store a null value.',
    'Care should be taken not to supply an object of such depth or serialized size that the underlying data store cannot save it.'
  ],
  examples: [
    { value: { hello: 'world', foo: { bar: true } }, paragraphs: ['In this example we store an object with nested objects.'] },
    { value: {}, paragraphs: ['Here we store an empty object.'] }
  ],
  validTestCases: [{}, { hello: 'world' }],
  invalidTestCases: [-1, 0, 999999, null, true, 'a house', []],
  jsonSchema: {
    type: 'object'
  }
}
