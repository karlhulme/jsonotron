export const schemaTypeSchema = {
  $id: 'schemaTypeSchema',
  title: 'Schema Type Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    kind: {
      enum: ['schema']
    },
    system: {
      type: 'string',
      pattern: '^[a-z][_a-zA-Z0-9]*$'
    },
    name: {
      type: 'string',
      pattern: '^[a-z][_a-zA-Z0-9]*$'
    },
    validTestCases: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          value: {},
          documentation: {
            type: 'string'
          }
        },
        required: [
          'value'
        ]
      }
    },
    invalidTestCases: {
      type: 'array'
    },
    jsonSchema: {
      type: 'object'
    },
    variants: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            pattern: '^[a-z][_a-zA-Z0-9]*$'
          },
          partial: {
            type: 'boolean'
          },
          includeFields: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          excludeFields: {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        },
        required: ['name', 'partial']
      }
    }
  },
  required: [
    'system',
    'name',
    'validTestCases',
    'invalidTestCases',
    'jsonSchema'
  ]
}
