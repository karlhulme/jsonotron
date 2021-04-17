export const enumTypeSchema = {
  $id: 'enumTypeSchema',
  title: 'Enum Type Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    kind: {
      enum: ['enum']
    },
    system: {
      type: 'string',
      pattern: '^[a-z][_a-zA-Z0-9]*$'
    },
    name: {
      type: 'string',
      pattern: '^[a-z][_a-zA-Z0-9]*$'
    },
    documentation: {
      type: 'string'
    },
    dataJsonSchema: {
      type: 'object'
    },
    items: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          value: {
            type: 'string',
            minLength: 1,
            maxLength: 250
          },
          text: {
            type: 'string'
          },
          symbol: {
            type: 'string'
          },
          deprecated: {
            type: 'string'
          },
          documentation: {
            type: 'string'
          },
          data: {
            type: 'object'
          }
        },
        required: [
          'value',
          'text'
        ]
      }
    }
  },
  required: [
    'system',
    'name',
    'items',
    'documentation'
  ]
}
