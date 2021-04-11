import { expect, test } from '@jest/globals'
import { EnumType, SchemaType } from 'jsonotron-interfaces'

test('Accept library', () => {
  expect(1 + 1).toEqual(2)
})

export function getTestTypes (): { enumTypes: EnumType[], schemaTypes: SchemaType[] } {
  return {
    enumTypes: [{
      kind: 'enum',
      system: 'test',
      name: 'color',
      documentation: 'A list of colors',
      dataJsonSchema: {
        type: 'object',
        documentation: 'Custom data that is attached to each color enum item.',
        additionalProperties: false,
        properties: {
          hexCode: { type: 'string' },
          isWarningColor: { type: 'boolean' }
        },
        required: ['hexCode']
      },
      items: [
        { value: '1red', text: 'Red', documentation: 'The color for errors', data: { hexCode: 'f00', isWarningColor: true } },
        { value: '2green', text: 'Green', data: { hexCode: '0f0' } }
      ]
    }, {
      kind: 'enum',
      system: 'test',
      name: 'size',
      documentation: 'A list of sizes',
      items: [
        { value: 'regular', text: 'Regular', symbol: 'M' },
        { value: 'large', text: 'Large', symbol: 'L' },
        { value: 'xlarge', text: 'Extra Large', deprecated: 'Cannot source anymore.' }
      ]
    }, {
      kind: 'enum',
      system: 'test',
      name: 'numbersList',
      documentation: 'A list of numbers',
      items: [
        { value: '1', text: '1 One' },
        { value: '2', text: '2 Two' },
        { value: '3', text: '3 Three' }
      ]
    }, {
      kind: 'enum',
      system: 'alt',
      name: 'direction',
      documentation: 'A list of directions (in an alternative system).',
      items: [
        { value: 'going/up', text: 'Up' },
        { value: 'going/down', text: 'Down' },
        { value: 'goingAround', text: 'Around' }
      ]
    }],
    schemaTypes: [{
      kind: 'schema',
      system: 'test',
      name: 'bed',
      jsonSchema: {
        type: 'object',
        documentation: 'A bed',
        additionalProperties: false,
        properties: {
          make: { type: 'string', documentation: 'The make of the bed.' },
          thickness: { type: 'number', documentation: 'The thickness of the bed mattress' },
          pillow: { $ref: 'pillow', documentation: 'The type of pillow on the bed' },
          direction: { $ref : 'https://jsonotron.org/alt/direction', documentation: 'The direction the bed is facing.' }
        },
        required: ['make']
      },
      examples: [
        { value: { make: 'SleepTight', thickness: 25 }, documentation: 'An example.' }
      ],
      validTestCases: [],
      invalidTestCases: []
    }, {
      kind: 'schema',
      system: 'test',
      name: 'pillow',
      jsonSchema: {
        type: 'object',
        documentation: 'A pillow',
        additionalProperties: false,
        properties: {
          make: { type: 'string', documentation: 'The mame of the pillow.' },
          color: { type: 'string', documentation: 'The color of the pillow.' }
        },
        required: ['make']
      },
      examples: [
        { value: { make: 'SleepTight', color: 'blue' }, documentation: 'An example.' }
      ],
      validTestCases: [],
      invalidTestCases: []
    }, {
      kind: 'schema',
      system: 'test',
      name: 'drawer',
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
          arrayOfStrings: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          arrayOfObjects: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                a: { type: 'string' },
                b: { type: 'string' }
              }
            }
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
      kind: 'schema',
      system: 'extra',
      name: 'table',
      jsonSchema: {
        type: 'object',
        documentation: 'A table.',
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
