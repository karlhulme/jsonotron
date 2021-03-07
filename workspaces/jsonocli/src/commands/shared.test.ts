import { expect, test } from '@jest/globals'
import { JsonoserveTypes } from './fetchTypes'

test('Accept library', () => {
  expect(1 + 1).toEqual(2)
})

export function getTestJsonoserveTypes (): JsonoserveTypes {
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
      documentation: 'A list of directions (in an alternative system.)',
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
          thickness: { type: 'number' }
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
    }],
    typeMap: {
      objectTypes: [],
      refTypes: []
    }
  }
}
