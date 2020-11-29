import { SchemaType } from '../interfaces'

export const what3words: SchemaType = {
  name: 'what3words',
  title: 'What 3 Words',
  paragraphs: [
    'A 3-element array that captures an address based on the https://what3words.com geocoding system.',
    'The system allows you to specify any location on Earth, within a few metres, using just 3 words.',
    'Each element in the array is a %%shortString%%.'
  ],
  examples: [
    {
      value: ['daring', 'lion', 'race'],
      paragraphs: [
        'This example locates an address near Charing Cross Station.'
      ]
    }, {
      value: ['science', 'touted', 'uplifted'],
      paragraphs: [
        'This example is for an embassy in panama.'
      ]
    }
  ],
  validTestCases: [
    ['trumpet', 'teapot', 'umbrella'],
    ['vase', 'flowers', 'road']
  ],
  invalidTestCases: [
    -1, 0, 999999, null, true, 'a house', {}, [],
    ['first'],
    ['first', 'second'],
    ['first', 'second', 3],
    ['first', 'second', 'third', 'fourth']
  ],
  jsonSchema: {
    type: 'array',
    minItems: 3,
    maxItems: 3,
    items: {
      $ref: '#/definitions/shortString'
    }
  }
}
