import { expect, test } from '@jest/globals'
import { EnumType, SchemaType } from 'jsonotron-interfaces'

test('Accept library', () => {
  expect(1 + 1).toEqual(2)
})

export function getTestTypes (): { enumTypes: EnumType[], schemaTypes: SchemaType[] } {
  return {
    enumTypes: [{
      domain: 'https://jsonotron.org',
      system: 'test',
      name: 'color',
      documentation: 'A list of colors',
      title: 'Color',
      items: [
        { value: 'red', text: 'Red', documentation: 'The color for errors' },
        { value: 'green', text: 'Green' }
      ]
    }, {
      domain: 'https://jsonotron.org',
      system: 'test',
      name: 'size',
      documentation: 'A list of sizes',
      title: 'Size',
      items: [
        { value: 'regular', text: 'Regular', symbol: 'M' },
        { value: 'large', text: 'Large', symbol: 'L' },
        { value: 'xlarge', text: 'Extra Large', deprecated: 'Cannot source anymore.' }
      ]
    }, {
      domain: 'https://jsonotron.org',
      system: 'alt',
      name: 'direction',
      documentation: 'A list of directions (in an alternative system).',
      title: 'Directions',
      items: [
        { value: 'up', text: 'Up' },
        { value: 'down', text: 'Down' }
      ]
    }],
    schemaTypes: [{
      domain: 'https://jsonotron.org',
      system: 'test',
      name: 'bed',
      documentation: 'A bed',
      title: 'Bed',
      jsonSchema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          make: { type: 'string' },
          thickness: { type: 'number' },
          pillow: { $ref: 'pillow' },
          direction: { $ref : 'https://jsonotron.org/alt/direction' }
        },
        required: ['make']
      },
      examples: [
        { value: { make: 'SleepTight', thickness: 25 }, documentation: 'An example.' }
      ],
      validTestCases: [],
      invalidTestCases: []
    }, {
      domain: 'https://jsonotron.org',
      system: 'test',
      name: 'pillow',
      documentation: 'A pillow',
      title: 'Pillow',
      jsonSchema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          make: { type: 'string' },
          color: { type: 'string' }
        },
        required: ['make']
      },
      examples: [
        { value: { make: 'SleepTight', color: 'blue' }, documentation: 'An example.' }
      ],
      validTestCases: [],
      invalidTestCases: []
    }, {
      domain: 'https://jsonotron.org',
      system: 'test',
      name: 'drawer',
      documentation: '',
      title: 'Bed Drawer',
      jsonSchema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          instructions: { type: 'object' },
          compact: { type: 'boolean' },
          fabrics: { enum: ['plaid', 'stripped'] },
          enumNumbers: { enum: [1, 2, 3] },
          enumBoolean: { enum: [true, false, true] },
          enumObjects: { enum: [{ obj: 'obj' }, { obj: 'obj2' }]},
          contents: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          complexContents: {
            type: 'array',
            items: [{
              type: 'string'
            }, {
              type: 'number'
            }]
          },
          age: { type: 'integer', documentation: 'The age in years.' }
        }
      },
      examples: [
        {
          value: {
            instructions: { any: 'thing' }, compact: true, fabrics: 'plaid', contents: ['batteries', 'clothes']
          },
          documentation: 'An example.'
        }
      ],
      validTestCases: [],
      invalidTestCases: []
    }, {
      domain: 'https://jsonotron.org',
      system: 'extra',
      name: 'table',
      documentation: 'A table',
      title: 'Table',
      jsonSchema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          height: { type: 'number' }
        }
      },
      examples: [
        { value: { height: 123 }, documentation: 'An example.' }
      ],
      validTestCases: [],
      invalidTestCases: []
    }]
  }
}