export function createSchemaTypeSchema ({ includeDocs, includeTests } = {}) {
  return {
    title: 'Schema Type Schema',
    type: 'object',
    description: 'The definition of a field type.',
    properties: {
      name: { type: 'string', description: 'The field type name.', pattern: '^[_a-zA-Z][_a-zA-Z0-9]*$' },
      title: { type: 'string', description: 'The title (display name) of the field type.' },
      paragraphs: {
        type: 'array',
        description: 'An array of paragraphs that describe the usage of the field.',
        minItems: includeDocs ? 1 : 0,
        items: { type: 'string' }
      },
      examples: {
        type: 'array',
        minItems: includeDocs ? 1 : 0,
        items: {
          type: 'object',
          properties: {
            value: {},
            paragraphs: {
              type: 'array',
              description: 'An array of paragraphs that describe the example.',
              minItems: includeDocs ? 1 : 0,
              items: { type: 'string' }
            }
          },
          required: ['value'].concat(includeDocs ? ['paragraphs'] : [])
        },
        description: 'An array of examples showing the field in use.'
      },
      validTestCases: {
        type: 'array',
        minItems: includeTests ? 1 : 0,
        description: 'An array of valid values used for testing the field that does not form part of the documentation.'
      },
      invalidTestCases: {
        type: 'array',
        minItems: includeTests ? 1 : 0,
        description: 'An array of invalid values for the field.'
      },
      jsonSchema: {
        type: 'object',
        description: 'A JSON schema that governs values for this field type.'
      },
      referencedSchemaTypes: {
        type: 'array',
        description: 'An array of the field types referenced directly by this field type.',
        items: { type: 'string' }
      },
      referencedEnumTypes: {
        type: 'array',
        description: 'An array of the enum types referenced directly by this field type.',
        items: { type: 'string' }
      }
    },
    required: ['name', 'jsonSchema'].concat(includeDocs ? ['title', 'paragraphs', 'examples'] : []).concat(includeTests ? ['validTestCases', 'invalidTestCases'] : [])
  }
}
