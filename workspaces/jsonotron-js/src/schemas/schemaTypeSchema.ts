export const schemaTypeSchema = {
  $id: 'schemaTypeSchema',
  title: 'Schema Type Schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    kind: {
      enum: ['schema']
    },
    domain: {
      type: 'string',
      pattern: '^https?://[_a-zA-Z][_a-zA-Z0-9.]*$'
    },
    system: {
      type: 'string',
      pattern: '^[_a-zA-Z][_a-zA-Z0-9]*$'
    },
    name: {
      type: 'string',
      pattern: '^[_a-zA-Z][_a-zA-Z0-9]*$'
    },
    examples: {
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
          'value',
          'documentation'
        ]
      }
    },
    validTestCases: {
      type: 'array'
    },
    invalidTestCases: {
      type: 'array'
    },
    jsonSchema: {
      type: 'object'
    }
  },
  required: [
    'domain',
    'system',
    'name',
    'examples',
    'validTestCases',
    'invalidTestCases',
    'jsonSchema'
  ]
}
